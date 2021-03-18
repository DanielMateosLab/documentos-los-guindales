import { NextApiHandler } from "next"
import { Browser } from "puppeteer-core"
import catchErrors from "server/middleware/catchErrors"
import { MethodNotAllowedError } from "utils/errors"
import { safeConductValidator } from "utils/validation"

export const safeConductHandler: NextApiHandler<any> = async (req, res) => {
  //TODO: create a function to encapsulate this logic and its tests and put it in your module
  if (req.method !== "POST") throw new MethodNotAllowedError()

  const user = safeConductValidator.validateSync(req.body, {
    abortEarly: false,
  })

  let browser: Browser
  let hostURL: string

  if (process.env.VERCEL == undefined) {
    const puppeteer = require("puppeteer")
    browser = await puppeteer.launch()

    hostURL = "http://localhost:3000"
  } else {
    const chromium = require("chrome-aws-lambda")
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    })

    hostURL = process.env.VERCEL_URL!
  }

  const page = await browser.newPage()
  await page.goto(
    hostURL +
      `/safe-conduct/${encodeURIComponent(
        user.name
      )}?identityDocument=${encodeURIComponent(user.identityDocument)}`,
    { waitUntil: "networkidle2" }
  )
  const pdf = await page.pdf({
    format: "a4",
    margin: {
      top: "1.9cm",
      left: "1.9cm",
      right: "1.32cm",
      bottom: "3.67cm",
    },
  })
  await browser.close()

  res.setHeader("content-type", "application/pdf")

  return res.send(pdf)
}

export default catchErrors(safeConductHandler)

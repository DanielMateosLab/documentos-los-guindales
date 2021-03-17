import { NextApiHandler } from "next"
import catchErrors from "server/middleware/catchErrors"
import { MethodNotAllowedError } from "utils/errors"
import { safeConductValidator } from "utils/validation"

let chrome = {}
let puppeteer: any
if (process.env.VERCEL) {
  chrome = require("chrome-aws-lambda")
  puppeteer = require("puppeteer-core")
} else {
  puppeteer = require("puppeteer")
}

export const safeConductHandler: NextApiHandler<any> = async (req, res) => {
  //TODO: create a function to encapsulate this logic and its tests and put it in your module
  if (req.method !== "POST") throw new MethodNotAllowedError()

  const user = safeConductValidator.validateSync(req.body, {
    abortEarly: false,
  })

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(
    "http://localhost:3000" +
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

import { Browser } from "puppeteer-core"

interface User {
  name: string
  identityDocument: string
}
const generatePdf = async (user: User): Promise<Buffer> => {
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

    hostURL = "http://" + process.env.VERCEL_URL!
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

  return pdf
}

export default generatePdf

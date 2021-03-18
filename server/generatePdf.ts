import { Browser } from "puppeteer-core"
import { getHostURL } from "utils/utils"

interface User {
  name: string
  identityDocument: string
}
const generatePdf = async (user: User): Promise<Buffer> => {
  let browser: Browser
  const hostURL = getHostURL()

  if (process.env.VERCEL == undefined) {
    const puppeteer = require("puppeteer")
    browser = await puppeteer.launch()
  } else {
    const chromium = require("chrome-aws-lambda")
    browser = await chromium.puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath,
      headless: chromium.headless,
      ignoreHTTPSErrors: true,
    })
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

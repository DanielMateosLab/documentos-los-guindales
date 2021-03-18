import { Browser } from "puppeteer-core"
import { GeneratePdfData } from "utils/types"
import { getHostURL, getPathname } from "utils/utils"

const generatePdf = async (user: GeneratePdfData): Promise<Buffer> => {
  let browser: Browser
  const hostURL = getHostURL()
  const pathname = getPathname(user)

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
  await page.goto(hostURL + pathname, { waitUntil: "networkidle2" })
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

import PDFDocument from "pdfkit"
import { GeneratePdfData } from "utils/types"

const generatePdf = (user: GeneratePdfData): Buffer | string => {
  const pdf = new PDFDocument({ size: "A4" })

  pdf.text("Hello World")
  pdf.end()

  return pdf.read()
}

export default generatePdf

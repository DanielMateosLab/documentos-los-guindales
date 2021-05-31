import fs from "fs"
import moment from "moment"
import path from "path"
import PDFDocument from "pdfkit"
import { PdfData } from "utils/types"
import { formatDate } from "utils/utils"

const title =
  "Declaración responsable para facilitar la movilidad relacionada con actividades de formación"
const submissionDate = formatDate(moment(), { withYear: true })
const indentation = 72 / 4

const generatePdf = async ({
  name = "",
  identityDocument = "",
  date = "",
}: PdfData): Promise<Buffer | string> => {
  const signatureImagePath = path.resolve("./public", "firma_africa.jpg")
  const signatureImage = await fs.promises.readFile(signatureImagePath)

  const doc = new PDFDocument({
    size: "A4",
    info: {
      Author: "África Rodríguez Nieves",
      Title: "Salvoconducto " + name,
    },
  })

  doc.fontSize(16).text(title, { align: "center" }).moveDown(2)

  doc.fontSize(12)

  doc
    .text(
      "D.ª África Rodríguez Nieves, con DNI 31685789T, actuando como representante de la Asociación Cultural Los Guindales (CIF: G93505725)."
    )
    .moveDown(1)

  doc
    .text("Datos de contacto de la asociación:", {
      indent: indentation,
    })
    .moveDown(1)

  // @ts-ignore
  doc
    .list(
      [
        "Correo electrónico: guindaluc@yahoo.es",
        "Domicilio: C/ Los Barrancos 2, Algatocín, Málaga.",
        "Teléfono: 664 368 784.",
      ],
      { indent: indentation, bulletRadius: 2 }
    )
    .moveDown(1)

  doc
    .text("Declara responsablemente:")
    .moveDown(1)

    .text("Que D/D.ª ", { continued: true, indent: indentation })
    .font("Helvetica-Bold")
    .text(name, { continued: true })
    .font("Helvetica")
    .text(" con documento de identidad ", { continued: true })
    .font("Helvetica-Bold")
    .text(identityDocument, { continued: true })
    .font("Helvetica")
    .text(
      ` es socio/a de la Asociación Cultural Los Guindales, en cuya sede realizará una formación ${date}`
    )
    .moveDown(1)
  doc
    .text(
      "Para que conste a los efectos de facilitar los trayectos necesarios entre su lugar de residencia y el lugar de formación.",
      {
        indent: indentation,
      }
    )
    .moveDown(2)

  doc.text(`En Algatocín, a ${submissionDate}.`).moveDown(1)

  doc.text("Fdo.: África Rodríguez Nieves", { align: "center" })
  doc.image(signatureImage, 200, undefined, {
    width: 200,
  })

  doc.end()

  return doc.read()
}

export default generatePdf

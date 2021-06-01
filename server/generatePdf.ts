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
  const signatureImagePath = path.resolve("./public", "signature.jpg")
  const signatureImage = await fs.promises.readFile(signatureImagePath)

  const doc = new PDFDocument({
    size: "A4",
    info: {
      Author: "Jhon Doe",
      Title: "Salvoconducto " + name,
    },
  })

  doc.fontSize(16).text(title, { align: "center" }).moveDown(2)

  doc.fontSize(12)

  doc
    .text(
      "D.ª Jhon Doe, con DNI 12345678A, actuando como representante de la Asociación Cultural Los Guindales (CIF: A0000000)."
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
        "Correo electrónico: jhondoe@jhon.doe",
        "Domicilio: Jhon's",
        "Teléfono: 666 666 666.",
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

  doc.text(`En Jhon's, a ${submissionDate}.`).moveDown(1)

  doc.text("Fdo.: Jhon Doe", { align: "center" })
  doc.image(signatureImage, 200, undefined, {
    width: 200,
  })

  doc.end()

  return doc.read()
}

export default generatePdf

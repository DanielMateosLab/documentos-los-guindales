import { Moment } from "moment"
import { PdfData } from "./types"

export const formatDate = (date: Moment, { withYear } = { withYear: false }) =>
  date.locale("es").format(`D [de] MMMM${withYear ? " [de] YYYY" : ""}`)

export const parseUsernameToPdfName = (name: string) =>
  name.split(" ").join("_")

export const getPathname = (pdfData: PdfData): string =>
  `/pdf-safe-conduct/${encodeURIComponent(
    pdfData.name
  )}?identityDocument=${encodeURIComponent(
    pdfData.identityDocument
  )}&date=${encodeURIComponent(pdfData.date)}`

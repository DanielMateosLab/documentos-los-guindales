import { Moment } from "moment"
import { PdfData } from "./types"

export const formatDate = (date: Moment, { withYear } = { withYear: false }) =>
  date.locale("es").format(`D [de] MMMM${withYear ? " [de] YYYY" : ""}`)

export const parseUsernameToPdfName = (name: string) =>
  name.split(" ").join("_")

export const getPathname = (pdfData: PdfData): string => {
  const queryParameters = Object.entries(pdfData)
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join("&")

  return "/pdf-safe-conduct?" + queryParameters
}

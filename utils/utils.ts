import { Moment } from "moment"
import { PdfData } from "./types"

export const formatDate = (date: Moment, { withYear } = { withYear: false }) =>
  date.locale("es").format(`D [de] MMMM${withYear ? " [de] YYYY" : ""}`)

export const parseUsernameToPdfName = (name: string) =>
  name.split(" ").join("_")

export const getPathname = ({ name, ...pdfData }: PdfData): string => {
  const queryParameters = new URLSearchParams(pdfData as {}).toString()

  return `/pdf-safe-conduct/${encodeURIComponent(name)}?` + queryParameters
}

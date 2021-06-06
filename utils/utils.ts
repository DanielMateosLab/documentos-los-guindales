import { useMediaQuery, useTheme } from "@material-ui/core"
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

export const useIsSmallDevice = () => {
  const theme = useTheme()
  const smallDevice = useMediaQuery(theme.breakpoints.down("xs"))

  return smallDevice
}

export function validateConfig(data: { [key: string]: any }): true | void {
  const missing: string[] = []

  Object.entries(data).forEach(([key, value]) => {
    if (value == undefined) missing.push(key)
  })

  if (missing.length == 0) return true

  const pluralModifier = missing.length > 1 ? "s" : ""
  throw new Error(
    `Missing environment variable${pluralModifier}: ${missing.join(", ")}`
  )
}

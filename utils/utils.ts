import { Moment } from "moment"
import { GeneratePdfData } from "./types"

export const formatDate = (date: Moment, { withYear } = { withYear: false }) =>
  date.locale("es").format(`D [de] MMMM${withYear ? " [de] YYYY" : ""}`)

export const parseUsernameToPdfName = (name: string) =>
  name.split(" ").join("_")

export const parseQueryParameters = (parameter: any) =>
  typeof parameter == "string" ? parameter : ""

export const extractUserFromQuery = (query: any) => {
  return {
    name: parseQueryParameters(query.name),
    identityDocument: parseQueryParameters(query.identityDocument),
  }
}

export const getPathname = (
  user: GeneratePdfData,
  target: "pdf" | "web" = "web"
): string =>
  `/${target == "pdf" ? "pdf-" : ""}safe-conduct/${encodeURIComponent(
    user.name
  )}?identityDocument=${encodeURIComponent(user.identityDocument)}`

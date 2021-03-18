import { Moment } from "moment"

export const formatDate = (date: Moment, { withYear } = { withYear: false }) =>
  date.locale("es").format(`DD [de] MMMM${withYear ? " [de] YYYY" : ""}`)

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

export const getHostURL = (): string =>
  "http://" + (process.env.VERCEL_URL || "localhost:3000")

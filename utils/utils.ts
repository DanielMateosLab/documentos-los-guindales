import { Moment } from "moment"

export const formatDate = (date: Moment, { withYear } = { withYear: false }) =>
  date.locale("es").format(`DD [de] MMMM${withYear ? " [de] YYYY" : ""}`)

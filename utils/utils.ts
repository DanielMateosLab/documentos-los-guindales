import { Moment } from "moment"

export const formatDate = (date: Moment) =>
  date.locale("es").format("DD [de] MMMM")

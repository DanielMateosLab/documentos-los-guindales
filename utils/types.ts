type SuccessResponse<Payload = {}> = {
  status: "success"
} & Payload

export type ErrorResponse<Payload = undefined> = {
  status: "error"
  name: string
  message: string
  /** Used in field validation or to give more details */
  payload?: Payload
}

export type SafeConductPostResponse = ErrorResponse | Buffer

export interface PdfData {
  name: string
  identityDocument: string
  date: string
}

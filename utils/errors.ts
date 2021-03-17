// TODO: move this code into an npm module: "@danielmat/utils"?

abstract class HttpError extends Error {
  abstract statusCode: number
}

export class InternalServerError extends HttpError {
  statusCode = 500
  name = "InternalServerError"
  constructor(message: string) {
    super(message)
  }
}

export class MethodNotAllowedError extends HttpError {
  statusCode = 405
  name = "MethodNotAllowedError"
  message = "Method not allowed"
}

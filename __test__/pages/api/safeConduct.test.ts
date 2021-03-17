import { createMocks, RequestOptions } from "node-mocks-http"
import safeConductHandler from "pages/api/safeConduct"
import { MethodNotAllowedError } from "utils/errors"

jest.mock("html-pdf", () => ({
  create: () => ({
    toBuffer: mockToBuffer,
  }),
}))
const mockToBuffer = jest.fn()

describe("/api/safeConduct", () => {
  describe("POST", () => {
    it("should throw a MethodNotAllowedError with get, put, patch or del", async () => {
      const notAllowedMethods: RequestOptions["method"][] = [
        "GET",
        "PUT",
        "PATCH",
        "DELETE",
      ]

      expect.assertions(notAllowedMethods.length)

      for (let method in notAllowedMethods) {
        const { req, res } = createMocks({
          method: method as RequestOptions["method"],
        })

        try {
          await safeConductHandler(req, res)
        } catch (e) {
          expect(e).toBeInstanceOf(MethodNotAllowedError)
        }
      }
    })
    it("should throw if the buffer is an error", () => {
      const error = "mockBufferError"
      mockToBuffer.mockImplementationOnce((cb) => cb(error))

      const { req, res } = createMocks({ method: "POST" })

      expect(() => safeConductHandler(req, res)).toThrowError(error)
    })
  })
})

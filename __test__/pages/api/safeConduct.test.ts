import { createMocks } from "node-mocks-http"
import safeConductHandler from "pages/api/safeConduct"

jest.mock("html-pdf", () => ({
  create: () => ({
    toBuffer: mockToBuffer,
  }),
}))
const mockToBuffer = jest.fn()

describe("/api/safeConduct", () => {
  describe("POST", () => {
    it("should throw if the buffer is an error", () => {
      const error = "mockBufferError"
      mockToBuffer.mockImplementationOnce((cb) => cb(error))

      const { req, res } = createMocks()

      expect(() => safeConductHandler(req, res)).toThrowError(error)
    })
  })
})

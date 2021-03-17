import {
  createMocks,
  createRequest,
  createResponse,
  RequestOptions,
} from "node-mocks-http"
import { safeConductHandler } from "pages/api/safeConduct"
import { MethodNotAllowedError } from "utils/errors"
import { parseUsernameToPdfName } from "utils/utils"
import { safeConductValidator } from "utils/validation"

jest.mock("html-pdf", () => ({
  create: () => ({
    toBuffer: mockToBuffer,
  }),
}))
const mockToBuffer = jest.fn()

describe("/api/safeConduct", () => {
  describe("POST", () => {
    let req: any, res: any

    beforeEach(() => {
      req = createRequest({
        method: "POST",
        body: {
          name: "aaaa aaaa",
          identityDocument: "aaaaaa",
          email: "aaaaa@aaaa.aaa",
        },
      })
      res = createResponse()
    })

    it("should throw a MethodNotAllowedError with get, put, patch or del", () => {
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
          safeConductHandler(req, res)
        } catch (e) {
          expect(e).toBeInstanceOf(MethodNotAllowedError)
        }
      }
    })
    it("should validate the req.body", () => {
      const validatorSpy = jest.spyOn(safeConductValidator, "validateSync")

      safeConductHandler(req, res)

      expect(validatorSpy).toHaveBeenCalled()
    })
    it("should throw if the buffer is an error", () => {
      const error = "mockBufferError"
      mockToBuffer.mockImplementationOnce((cb) => cb(error))

      expect(() => safeConductHandler(req, res)).toThrowError(error)
    })
    describe("buffer returned", () => {
      const mockBuffer = Buffer.from("mockBuffer")

      beforeEach(() => {
        mockToBuffer.mockImplementationOnce((cb) => cb(undefined, mockBuffer))
      })

      it("should set the proper headers", () => {
        const setHeadersSpy = jest.spyOn(res, "setHeader")
        const pdfName = parseUsernameToPdfName(req.body.name)

        safeConductHandler(req, res)

        expect(setHeadersSpy.mock.calls[0]).toEqual([
          "content-disposition",
          `attachment; filename="${pdfName}.pdf"`,
        ])
        expect(setHeadersSpy.mock.calls[1]).toEqual([
          "content-type",
          "application/pdf",
        ])
      })
      it("should send the pdf buffer", () => {
        const sendSpy = jest.spyOn(res, "send")

        safeConductHandler(req, res)

        expect(sendSpy).toHaveBeenCalledWith(mockBuffer)
      })
    })
  })
})

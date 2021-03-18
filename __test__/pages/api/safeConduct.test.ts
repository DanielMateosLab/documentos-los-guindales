import {
  createMocks,
  createRequest,
  createResponse,
  RequestOptions,
} from "node-mocks-http"
import { safeConductHandler } from "pages/api/safeConduct"
import { MethodNotAllowedError } from "utils/errors"
import { safeConductValidator } from "utils/validation"

describe("/api/safeConduct", () => {
  describe("POST", () => {
    let req: any, res: any

    const user = {
      name: "aaaa aaaa",
      identityDocument: "aaaaaa",
      email: "aaaaa@aaaa.aaa",
    }
    const mockBuffer = Buffer.from("a")

    const validatorSpy = jest
      .spyOn(safeConductValidator, "validate")
      .mockImplementation(async () => user as any)
    const generatePdfSpy = jest
      .spyOn(require("server/generatePdf"), "default")
      .mockImplementation(async () => mockBuffer)

    beforeEach(() => {
      req = createRequest({
        method: "POST",
        body: user,
      })
      res = createResponse()
    })

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
    it("should validate the req.body", async () => {
      await safeConductHandler(req, res)

      expect(validatorSpy).toHaveBeenCalled()
    })
    it("should generate the pdf", async () => {
      await safeConductHandler(req, res)

      const { email, ...userData } = user

      expect(generatePdfSpy).toHaveBeenCalledWith(userData)
    })
    it("should set the proper headers", async () => {
      const setHeadersSpy = jest.spyOn(res, "setHeader")

      await safeConductHandler(req, res)

      expect(setHeadersSpy).toHaveBeenCalledWith(
        "content-type",
        "application/pdf"
      )
    })
    it("should send the pdf buffer", async () => {
      const sendSpy = jest.spyOn(res, "send")

      await safeConductHandler(req, res)

      expect(sendSpy).toHaveBeenCalledWith(mockBuffer)
    })
  })
})

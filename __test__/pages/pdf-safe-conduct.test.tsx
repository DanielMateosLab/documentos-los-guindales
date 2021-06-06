import { getServerSideProps } from "pages/pdf-safe-conduct/[name]"
import { mockBuffer } from "server/__mocks__/generatePdf"

jest.mock("server/generatePdf")

describe("pdf safe conduct page", () => {
  describe("getServerSideProps", () => {
    const user = {
      name: "aaaa aaaa",
      identityDocument: "aaaaaa",
    }
    const context: any = {
      query: user,
      res: {
        end: jest.fn(),
        setHeader: jest.fn(),
      },
    }
    const validateConfigSpy = jest
      .spyOn(require("utils/utils"), "validateConfig")
      .mockImplementation(() => true)

    it("should validate the configuration values", async () => {
      await getServerSideProps(context)

      expect(validateConfigSpy).toHaveBeenCalled()
    })

    it("should call res.end with the pdf buffer", async () => {
      await getServerSideProps(context)

      expect(context.res.end).toHaveBeenCalledWith(mockBuffer)
    })

    it("should return empty props in an object", async () => {
      const returnValue = await getServerSideProps(context)

      expect(returnValue).toEqual({ props: {} })
    })

    it("should return error message in props.error", async () => {
      const error = new Error("mockError")
      validateConfigSpy.mockImplementationOnce(() => {
        throw error
      })

      const result = await getServerSideProps(context)

      expect(result).toEqual({ props: { error: error.message } })
    })
  })
})

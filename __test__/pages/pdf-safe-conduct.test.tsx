import { getServerSideProps } from "pages/pdf-safe-conduct/[name]"
import { extractUserFromQuery } from "utils/utils"

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
      },
    }
    const mockBuffer = Buffer.from("a")
    const generatePdfSpy = jest
      .spyOn(require("server/generatePdf"), "default")
      .mockImplementation(async () => mockBuffer)

    it("should extract the user from the query parameters", async () => {
      const extractUserFromQuerySpy = jest.spyOn(
        require("utils/utils"),
        "extractUserFromQuery"
      )
      await getServerSideProps(context)

      expect(extractUserFromQuery).toHaveBeenCalledWith(context.query)
    })
    it("should generate the pdf", async () => {
      await getServerSideProps(context)

      expect(generatePdfSpy).toHaveBeenCalledWith(user)
    })
    it("should call res.end with the pdf buffer", async () => {
      await getServerSideProps(context)

      expect(context.res.end).toHaveBeenCalledWith(mockBuffer)
    })
    it("should return empty props in an object", async () => {
      const returnValue = await getServerSideProps(context)

      expect(returnValue).toEqual({ props: {} })
    })
  })
})

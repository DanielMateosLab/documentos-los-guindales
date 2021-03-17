import SafeConduct from "client/components/SafeConduct"
import pdf from "html-pdf"
import { NextApiHandler } from "next"
import { renderToStaticMarkup } from "react-dom/server"
import catchErrors from "server/middleware/catchErrors"
import { MethodNotAllowedError } from "utils/errors"
import { SafeConductPostResponse } from "utils/types"
import { parseUsernameToPdfName } from "utils/utils"
import { safeConductValidator } from "utils/validation"

export const safeConductHandler: NextApiHandler<SafeConductPostResponse> = (
  req,
  res
) => {
  //TODO: create a function to encapsulate this logic and its tests and put it in your module
  if (req.method !== "POST") throw new MethodNotAllowedError()

  const user = safeConductValidator.validateSync(req.body, {
    abortEarly: false,
  })

  const htmlSafeConduct = renderToStaticMarkup(
    <SafeConduct name={user.name} identityDocument={user.identityDocument} />
  )

  pdf
    .create(htmlSafeConduct, {
      format: "A4",
      orientation: "portrait",
    })
    .toBuffer((error, buffer) => {
      if (error) {
        throw error
      }

      const pdfName = parseUsernameToPdfName(user.name)
      res.setHeader(
        "content-disposition",
        `attachment; filename="${pdfName}.pdf"`
      )

      res.setHeader("content-type", "application/pdf")

      return res.send(buffer)
    })
}

export default catchErrors(safeConductHandler)

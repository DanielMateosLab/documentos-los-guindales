import { NextApiHandler } from "next"
import generatePdf from "server/generatePdf"
import catchErrors from "server/middleware/catchErrors"
import { MethodNotAllowedError } from "utils/errors"
import { safeConductValidator } from "utils/validation"

export const safeConductHandler: NextApiHandler<Buffer | string> = async (
  req,
  res
) => {
  if (req.method !== "POST") throw new MethodNotAllowedError()

  const pdfData = await safeConductValidator.validate(req.body, {
    abortEarly: false,
  })

  const pdf = await generatePdf(pdfData)

  res.setHeader("content-type", "application/pdf")

  return res.send(pdf)
}

export default catchErrors(safeConductHandler)

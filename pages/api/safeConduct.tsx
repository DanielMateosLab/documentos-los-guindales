import { NextApiHandler } from "next"
import generatePdf from "server/generatePdf"
import catchErrors from "server/middleware/catchErrors"
import { MethodNotAllowedError } from "utils/errors"
import { safeConductValidator } from "utils/validation"

export const safeConductHandler: NextApiHandler<Buffer | string> = async (
  req,
  res
) => {
  //TODO: create a function to encapsulate this logic and its tests and put it in your module
  if (req.method !== "POST") throw new MethodNotAllowedError()

  const user = await safeConductValidator.validate(req.body, {
    abortEarly: false,
  })

  const pdf = generatePdf({
    name: user.name,
    identityDocument: user.identityDocument,
  })

  res.setHeader("content-type", "application/pdf")

  return res.send(pdf)
}

export default catchErrors(safeConductHandler)

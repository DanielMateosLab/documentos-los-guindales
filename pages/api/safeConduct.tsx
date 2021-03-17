import SafeConduct from "client/components/SafeConduct"
import pdf from "html-pdf"
import { NextApiHandler } from "next"
import { renderToStaticMarkup } from "react-dom/server"
import { MethodNotAllowedError } from "utils/errors"
import { SafeConductPostResponse } from "utils/types"

const safeConductHandler: NextApiHandler<SafeConductPostResponse> = (
  req,
  res
) => {
  //TODO: craete a function to encapsulate this logic and its tests and put it in your module
  if (req.method !== "POST") throw new MethodNotAllowedError()

  const htmlSafeConduct = renderToStaticMarkup(
    <SafeConduct
      name={req.body.name}
      identityDocument={req.body.identityDocument}
    />
  )
  const pdfSafeConduct = pdf
    .create(htmlSafeConduct, {
      format: "A4",
      orientation: "portrait",
    })
    .toBuffer((error, buffer) => {
      if (error) {
        throw error
      }
    })
}

export default safeConductHandler

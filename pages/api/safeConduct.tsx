import SafeConduct from "client/components/SafeConduct"
import pdf from "html-pdf"
import { NextApiHandler } from "next"
import { renderToStaticMarkup } from "react-dom/server"
import { SafeConductPostResponse } from "utils/types"

const safeConductHandler: NextApiHandler<SafeConductPostResponse> = (
  req,
  res
) => {
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

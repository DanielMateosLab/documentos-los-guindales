import SafeConduct from "client/components/SafeConduct"
import pdf from "html-pdf"
import { GetServerSideProps } from "next"
import { renderToStaticMarkup } from "react-dom/server"
import { render } from "utils/testUtils"
import { parseQueryParameters, parseUsernameToPdfName } from "utils/utils"

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const user = {
    name: parseQueryParameters(query.name),
    identityDocument: parseQueryParameters(query.identityDocument),
  }
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
        return {
          props: {
            error,
          },
        }
      }

      const pdfName = parseUsernameToPdfName(user.name)
      res.setHeader(
        "content-disposition",
        `attachment; filename="${pdfName}.pdf"`
      )

      res.setHeader("content-type", "application/pdf")

      res.end(buffer)
    })
  return {
    props: {},
  }
}

export default function SafeConductPage(props: any) {
  render(
    <div>
      {props.error && <p>Ha ocurrido un error: {props.error.message}</p>}
    </div>
  )
}

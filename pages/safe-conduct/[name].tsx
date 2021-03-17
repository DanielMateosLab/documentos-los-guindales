import SafeConduct from "client/components/SafeConduct"
import pdf from "html-pdf"
import { GetServerSideProps } from "next"
import { renderToStaticMarkup } from "react-dom/server"
import { parseQueryParameters } from "utils/utils"

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const user = {
    name: decodeURIComponent(parseQueryParameters(query.name)),
    identityDocument: decodeURIComponent(
      parseQueryParameters(query.identityDocument)
    ),
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

      res.end(buffer)
    })
  return {
    props: {},
  }
}

export default function SafeConductPage(props: any) {
  return (
    <div>
      {props.error && <p>Ha ocurrido un error: {props.error.message}</p>}
    </div>
  )
}

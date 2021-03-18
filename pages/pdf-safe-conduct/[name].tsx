import { Container, makeStyles, Typography } from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"
import { GetServerSideProps } from "next"
import generatePdf from "server/generatePdf"
import { extractUserFromQuery } from "utils/utils"

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
}) => {
  try {
    const user = extractUserFromQuery(query)

    const pdf = await generatePdf(user)

    res.end(pdf)
  } catch (e) {
    console.error(e)
    return {
      props: {
        error: e.message || null,
      },
    }
  }

  return {
    props: {},
  }
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    display: "flex",
    justifyContent: "center",
  },
}))

interface Props {
  error?: string
}
export default function pdfSafeConductPage(props: Props) {
  const styles = useStyles()

  return (
    <Container className={styles.container}>
      <div>
        <Alert severity="error">
          <AlertTitle>
            Ha ocurrido un error generando el salvoconducto
          </AlertTitle>
          <Typography gutterBottom variant="body2">
            Vuelve a intentarlo y contacta con Dani si el error persiste.
          </Typography>
          {props.error && (
            <Typography variant="body2">
              Información adicional: <em>{props.error}.</em>
            </Typography>
          )}
        </Alert>
      </div>
    </Container>
  )
}

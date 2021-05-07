import {
  Button,
  Collapse,
  Container,
  Link,
  makeStyles,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"
import FormikTextInput from "client/components/FormikTextInput"
import { Form, FormikProps } from "formik"
import { useEffect } from "react"
import { SafeConductFormValues } from "utils/types"
import pdfSafeConductReducer from "./reducer"

export const dateLabel = "Fecha"
export const nameLabel = "Nombre"
export const identityDocumentLabel = "DNI/NIE"
export const emailLabel = "Correo electrónico"
export const submitButtonText = "Generar salvoconducto"

export const successPdfGenerationMessage =
  "El salvoconducto se abrirá en una nueva pestaña"
export const failPdfGenerationMessage =
  "Ha habido un problema generando el salvoconducto. Vuelve a intentarlo más tarde o contacta con Dani."

interface Props {
  formik: FormikProps<SafeConductFormValues>
  state: Parameters<typeof pdfSafeConductReducer>[0]
}

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "24px",
    padding: theme.spacing(2),
  },
  formElement: {
    marginTop: theme.spacing(2),
  },
  indentation: {
    paddingLeft: theme.spacing(2),
  },
  participantInput: {
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  centeredButton: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}))

const SafeConductForm: React.FC<Props> = ({ formik, state }) => {
  const classes = useStyles()

  useEffect(() => {
    const localStorageDate = window.localStorage.getItem("date")
    if (localStorageDate) formik.setFieldValue("date", localStorageDate)
  }, [])

  const theme = useTheme()
  const smallDevice = useMediaQuery(theme.breakpoints.down("xs"))
  const responsiveAlign = smallDevice ? "center" : undefined

  return (
    <Container className={classes.container} maxWidth="md">
      <Typography variant="h4" component="h1" align={responsiveAlign}>
        Generador de salvoconductos
      </Typography>
      <Form>
        <div className={classes.formElement}>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            align={responsiveAlign}
          >
            Fecha del salvoconducto
          </Typography>
          <Typography>
            En el documento generado, corresponde al texto marcado en negrita en
            el siguiente párrafo:
          </Typography>
          <Typography variant="body2" className={classes.indentation} paragraph>
            Que D/D.ª [...] realizará una formación <b>{formik.values.date}</b>.
          </Typography>
          <FormikTextInput
            name="date"
            variant="outlined"
            type="text"
            label={dateLabel}
            multiline
            fullWidth
          />
        </div>
        <div className={classes.formElement}>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            align={responsiveAlign}
          >
            Datos del participante
          </Typography>
          <FormikTextInput
            className={classes.participantInput}
            name="name"
            variant="outlined"
            type="text"
            label={nameLabel}
            fullWidth={smallDevice}
          />
          <FormikTextInput
            className={classes.participantInput}
            name="identityDocument"
            variant="outlined"
            type="text"
            label={identityDocumentLabel}
            fullWidth={smallDevice}
          />
        </div>
        <div className={classes.formElement}>
          <div className={smallDevice ? classes.centeredButton : undefined}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              disabled={formik.isSubmitting}
            >
              {submitButtonText}
            </Button>
          </div>
        </div>
        <Collapse in={state.status == "success"}>
          <div className={classes.formElement}>
            <Alert severity="success">
              <AlertTitle>{successPdfGenerationMessage}</AlertTitle>
              Si no funciona,{" "}
              <Link href={state.pathname} target="_blank">
                pulsa aquí
              </Link>
              .
            </Alert>
          </div>
        </Collapse>
        <Collapse in={state.status == "error"}>
          <div className={classes.formElement}>
            <Alert severity="error"> {failPdfGenerationMessage} </Alert>
          </div>
        </Collapse>
      </Form>
    </Container>
  )
}

export default SafeConductForm

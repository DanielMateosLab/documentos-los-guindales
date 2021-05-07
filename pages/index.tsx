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
import pdfSafeConductReducer from "client/pdf-safe-conduct/reducer"
import { Formik, FormikHelpers } from "formik"
import { useEffect, useReducer } from "react"
import { getPathname } from "utils/utils"
import { safeConductValidator } from "utils/validation"

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

export const dateLabel = "Fecha"
export const nameLabel = "Nombre"
export const identityDocumentLabel = "DNI/NIE"
export const emailLabel = "Correo electrónico"
export const submitButtonText = "Generar salvoconducto"

export const successPdfGenerationMessage =
  "El salvoconducto se abrirá en una nueva pestaña"
export const failPdfGenerationMessage =
  "Ha habido un problema generando el salvoconducto. Vuelve a intentarlo más tarde o contacta con Dani."

export default function Home() {
  const [state, dispatch] = useReducer(pdfSafeConductReducer, {
    status: undefined,
    pathname: undefined,
  })

  const initialValues = {
    date: "los días 2 y 3 de abril de 2021",
    name: "",
    identityDocument: "",
  }
  type FormValues = typeof initialValues
  const handleSubmit = (
    values: FormValues,
    { setSubmitting }: FormikHelpers<FormValues>
  ) => {
    dispatch({ type: "setStatus", payload: undefined })

    // Why not to set the pathname and then use it in window.open()?
    //  For performance reasons, react sometimes does not update the state inmediatly
    //  so the opened tab has not the updated path
    const newPathname = getPathname({ ...values })
    window.open(newPathname, "_blank")
    dispatch({ type: "setPathname", payload: newPathname })

    window.localStorage.setItem("date", values.date)

    dispatch({ type: "setStatus", payload: "success" })
    setSubmitting(false)
  }

  const theme = useTheme()
  const smallDevice = useMediaQuery(theme.breakpoints.down("xs"))
  const responsiveAlign = smallDevice ? "center" : undefined

  const classes = useStyles()

  return (
    <Container className={classes.container} maxWidth="md">
      <Typography variant="h4" component="h1" align={responsiveAlign}>
        Generador de salvoconductos
      </Typography>
      <Formik
        {...{ initialValues }}
        validationSchema={safeConductValidator}
        onSubmit={handleSubmit}
      >
        {(formik) => {
          useEffect(() => {
            const localStorageDate = window.localStorage.getItem("date")
            if (localStorageDate) formik.setFieldValue("date", localStorageDate)
          }, [])
          return (
            <form onSubmit={formik.handleSubmit}>
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
                  En el documento generado, corresponde al texto marcado en
                  negrita en el siguiente párrafo:
                </Typography>
                <Typography
                  variant="body2"
                  className={classes.indentation}
                  paragraph
                >
                  Que D/D.ª [...] realizará una formación{" "}
                  <b>{formik.values.date}</b>.
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
                <div
                  className={smallDevice ? classes.centeredButton : undefined}
                >
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
            </form>
          )
        }}
      </Formik>
    </Container>
  )
}

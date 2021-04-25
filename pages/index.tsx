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
import { Formik } from "formik"
import { useState } from "react"
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

const placeholderDate = "los días 2 y 3 de abril de 2021"

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
  const [successMessage, setSuccessMessage] = useState<string | undefined>()
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [pathname, setPathname] = useState<string | undefined>()

  const theme = useTheme()
  const smallDevice = useMediaQuery(theme.breakpoints.down("sm"))
  const responsiveAlign = smallDevice ? "center" : undefined

  const classes = useStyles({
    smallDevice,
  })

  return (
    <Container className={classes.container} maxWidth="md">
      <Typography variant="h4" component="h1" align={responsiveAlign}>
        Generador de salvoconductos
      </Typography>
      <Formik
        initialValues={{
          date: placeholderDate,
          name: "",
          identityDocument: "",
        }}
        validationSchema={safeConductValidator}
        onSubmit={(values, { setSubmitting }) => {
          setSuccessMessage(undefined)
          setErrorMessage(undefined)

          // Why not to set the pathname and then use it in window.open()?
          //  For performance reasons, react sometimes does not update the state inmediatly
          //  so the opened tab has not the updated path
          const newPathname = getPathname({ ...values })
          window.open(newPathname, "_blank")
          setPathname(newPathname)

          setSuccessMessage(successPdfGenerationMessage)
          setSubmitting(false)
        }}
      >
        {(formik) => (
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
                Que D/D.ª Teodora Meixeira con documento de identidad 68796252L
                es socio/ a de la Asociación Cultural Los Guindales, en cuya
                sede realizará una formación <b>{formik.values.date}</b>.
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
            <Collapse in={!!successMessage}>
              <div className={classes.formElement}>
                <Alert severity="success">
                  <AlertTitle>{successMessage}</AlertTitle>
                  Si no funciona,{" "}
                  <Link href={pathname} target="_blank">
                    pulsa aquí
                  </Link>
                  .
                </Alert>
              </div>
            </Collapse>
            <Collapse in={!!errorMessage}>
              <div className={classes.formElement}>
                <Alert severity="error"> {errorMessage} </Alert>
              </div>
            </Collapse>
          </form>
        )}
      </Formik>
    </Container>
  )
}

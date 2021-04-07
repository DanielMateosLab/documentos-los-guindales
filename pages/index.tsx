import {
  Button,
  Collapse,
  Container,
  Link,
  makeStyles,
  Typography,
} from "@material-ui/core"
import { Alert, AlertTitle } from "@material-ui/lab"
import FormikRadioGroup from "client/components/FormikRadioGroup"
import FormikTextInput from "client/components/FormikTextInput"
import { Formik } from "formik"
import moment from "moment"
import { useRouter } from "next/router"
import { useState } from "react"
import { AppEvent } from "utils/types"
import { formatDate, getPathname } from "utils/utils"
import { safeConductValidator } from "utils/validation"

// TODO: use css grid to style the form so the radioGroup does not override left margin

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: "24px",
    padding: theme.spacing(1),
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formElement: {
    marginTop: theme.spacing(2),
  },
  actionTitle: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(1),
  },
}))

export const event: AppEvent = {
  name: "Taller de Hierbas Medicinales",
  startDate: moment("2021-04-02"),
  endDate: moment("2021-04-03"),
}

export const nameLabel = "Nombre"
export const identityDocumentLabel = "DNI/NIE"
export const emailLabel = "Correo electrónico"
export const actionLabel = "¿Qué hacemos con el pdf?"

export const sendToMailLabel = "Enviarlo por correo electrónico"
export const openLabel = "Abrirlo"

export const submitButtonText = "Generar salvoconducto"
export const successPdfGenerationMessage =
  "El salvoconducto se abrirá en una nueva pestaña"
export const failPdfGenerationMessage =
  "Ha habido un problema generando el salvoconducto. Vuelve a intentarlo más tarde o contacta con Dani."

export default function Home() {
  const styles = useStyles()
  const [successMessage, setSuccessMessage] = useState<string | undefined>()
  const [errorMessage, setErrorMessage] = useState<string | undefined>()
  const [pathname, setPathname] = useState<string | undefined>()
  const router = useRouter()

  return (
    <Container className={styles.container}>
      <Typography variant="h4" component="h1" align="center">
        Salvoconducto para el {event.name}.
      </Typography>
      <Typography variant="subtitle1" align="center">
        Del {formatDate(event.startDate)} al {formatDate(event.endDate)}.
      </Typography>
      <Formik
        initialValues={{
          name: "",
          identityDocument: "",
          email: "",
          action: "",
        }}
        validationSchema={safeConductValidator}
        onSubmit={(values, { setSubmitting }) => {
          setSuccessMessage(undefined)
          setErrorMessage(undefined)

          const newPathname = getPathname(
            {
              name: values.name,
              identityDocument: values.identityDocument,
            },
            "pdf"
          )
          setPathname(newPathname)

          window.open(newPathname, "_blank")

          setSuccessMessage(successPdfGenerationMessage)
          setSubmitting(false)
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className={styles.form}>
            <div className={styles.formElement}>
              <FormikTextInput
                name="name"
                variant="outlined"
                type="text"
                label={nameLabel}
              />
            </div>
            <div className={styles.formElement}>
              <FormikTextInput
                name="identityDocument"
                variant="outlined"
                type="text"
                label={identityDocumentLabel}
              />
            </div>
            {/* <div className={classes.formElement}>
              <FormikTextInput
                name="email"
                variant="outlined"
                type="text"
                label={emailLabel}
              />
            </div> */}
            <div className={styles.formElement}>
              <FormikRadioGroup
                label={actionLabel}
                name="action"
                options={{
                  open: openLabel,
                  sendToMail: sendToMailLabel,
                }}
              />
            </div>
            <div className={styles.formElement}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {submitButtonText}
              </Button>
            </div>
            <Collapse in={!!successMessage}>
              <div className={styles.formElement}>
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
              <div className={styles.formElement}>
                <Alert severity="error"> {errorMessage} </Alert>
              </div>
            </Collapse>
          </form>
        )}
      </Formik>
    </Container>
  )
}

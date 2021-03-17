import {
  Button,
  Collapse,
  Container,
  makeStyles,
  Typography,
} from "@material-ui/core"
import { Alert } from "@material-ui/lab"
import FormikTextInput from "client/components/FormikTextInput"
import { Field, Formik } from "formik"
import moment from "moment"
import { useState } from "react"
import { AppEvent } from "utils/types"
import { formatDate } from "utils/utils"
import { safeConductValidator } from "utils/validation"

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
}))

export const event: AppEvent = {
  name: "Taller de Hierbas Medicinales",
  startDate: moment("2021-03-13"),
  endDate: moment("2021-03-14"),
}

export const nameLabel = "Nombre"
export const identityDocumentLabel = "DNI/NIE"
export const emailLabel = "Correo electrónico"
export const submitButtonText = "Generar salvoconducto"
export const successPdfGenerationMessage =
  "El salvoconducto se ha creado con éxito. En breve se abrirá en una nueva pestaña."
export const failPdfGenerationMessage =
  "Ha habido un problema generando el salvoconducto. Vuelve a intentarlo más tarde o contacta con Dani."

export default function Home() {
  const classes = useStyles()
  const [successMessage, setSuccessMessage] = useState<string | undefined>()
  const [errorMessage, setErrorMessage] = useState<string | undefined>()

  return (
    <Container className={classes.container}>
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
        }}
        validationSchema={safeConductValidator}
        onSubmit={async (values, { setSubmitting }) => {
          setSuccessMessage(undefined)
          setErrorMessage(undefined)
          const res = await fetch("/api/safeConduct", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(values),
          })
          if (res.ok) {
            setSuccessMessage(successPdfGenerationMessage)
            window.open(URL.createObjectURL(await res.blob()), "_blank")
          } else {
            setErrorMessage(failPdfGenerationMessage)
          }
          setSubmitting(false)
        }}
      >
        {(formik) => (
          <form onSubmit={formik.handleSubmit} className={classes.form}>
            <div className={classes.formElement}>
              <FormikTextInput
                name="name"
                variant="outlined"
                type="text"
                label={nameLabel}
              />
            </div>
            <div className={classes.formElement}>
              <FormikTextInput
                name="identityDocument"
                variant="outlined"
                type="text"
                label={identityDocumentLabel}
              />
            </div>
            <div className={classes.formElement}>
              <FormikTextInput
                name="email"
                variant="outlined"
                type="text"
                label={emailLabel}
              />
            </div>
            <div className={classes.formElement}>
              <Field as="select" name="generationRoute">
                <option value="api">API</option>
                <option value="client">Client</option>
              </Field>
            </div>
            <div className={classes.formElement}>
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
              <div className={classes.formElement}>
                <Alert severity="success"> {successMessage} </Alert>
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

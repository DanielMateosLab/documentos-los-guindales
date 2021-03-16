import { Button, Container, makeStyles, Typography } from "@material-ui/core"
import FormikTextInput from "client/components/FormikTextInput"
import { Formik } from "formik"
import moment from "moment"
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

export default function Home() {
  const classes = useStyles()

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
          await fetch("/api/safeConduct", {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify(values),
          })
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
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {submitButtonText}
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </Container>
  )
}

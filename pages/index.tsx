import pdfSafeConductReducer from "client/pdf-safe-conduct/reducer"
import SafeConductForm from "client/pdf-safe-conduct/safeConductForm"
import { Formik, FormikHelpers } from "formik"
import { useReducer } from "react"
import { SafeConductFormValues } from "utils/types"
import { getPathname } from "utils/utils"
import { safeConductValidator } from "utils/validation"

export default function Home() {
  const [state, dispatch] = useReducer(pdfSafeConductReducer, {
    status: undefined,
    pathname: undefined,
  })

  const initialValues: SafeConductFormValues = {
    date: "los días 2 y 3 de abril de 2021",
    name: "",
    identityDocument: "",
  }

  const handleSubmit = (
    values: SafeConductFormValues,
    { setSubmitting }: FormikHelpers<SafeConductFormValues>
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

  return (
    <Formik
      {...{ initialValues }}
      validationSchema={safeConductValidator}
      onSubmit={handleSubmit}
      children={(formik) => <SafeConductForm {...{ state, formik }} />}
    />
  )
}

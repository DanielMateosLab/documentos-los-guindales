import { render, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Formik } from "formik"
import * as yup from "yup"
import FormikTextInput from "./FormikTextInput"

describe("FormikTextInput", () => {
  const label = "mockField"
  const validator = yup.object({ fieldToTest: yup.string() })
  const spy = jest.spyOn(validator, "validate")
  let fieldElement: HTMLElement

  beforeEach(() => {
    const { getByLabelText } = render(
      <Formik
        initialValues={{ fieldToTest: "" }}
        onSubmit={() => {}}
        validationSchema={validator}
      >
        {() => <FormikTextInput name="fieldToTest" label={label} type="text" />}
      </Formik>
    )
    fieldElement = getByLabelText(label)
  })

  test("should trigger the validation whenever we type on the field", async () => {
    userEvent.type(fieldElement, "a")

    await waitFor(() => {
      expect(spy).toHaveBeenCalled()
    })
  })
  test("should trigger the validation whenever we leave the field", async () => {
    userEvent.click(fieldElement)
    userEvent.tab() // leaves the field

    await waitFor(() => {
      expect(spy).toHaveBeenCalled()
    })
  })
})

import * as yup from "yup"

export const requiredErrorText = "Campo obligatorio"
export const getMaxErrorText = (max: number) =>
  `Debe tener ${max} o menos caracteres`
export const getMinErrorText = (min: number) =>
  `Debe tener ${min} o más caracteres`

export const safeConductValidator = yup.object().shape({
  date: yup
    .string()
    .required(requiredErrorText)
    .max(200, ({ max }) => `Debe tener ${max} o menos caracteres`),
  name: yup
    .string()
    .required(requiredErrorText)
    .max(55, ({ max }) => `Debe tener ${max} o menos caracteres`),
  identityDocument: yup
    .string()
    .required(requiredErrorText)
    .max(55, ({ max }) => `Debe tener ${max} o menos caracteres`),
})

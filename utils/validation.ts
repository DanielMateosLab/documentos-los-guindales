import * as yup from "yup"

export const requiredErrorText = "Campo obligatorio"
export const getMaxErrorText = (max: number) =>
  `Debe tener ${max} o menos caracteres`
export const getMinErrorText = (min: number) =>
  `Debe tener ${min} o más caracteres`

export const emailMaxCharacters = 256
export const emailErrorText = "La dirección de correo electrónico no es válida"

export const safeConductValidator = yup.object().shape({
  name: yup
    .string()
    .required(requiredErrorText)
    .max(55, ({ max }) => `Debe tener ${max} o menos caracteres`),
  identityDocument: yup
    .string()
    .required(requiredErrorText)
    .max(55, ({ max }) => `Debe tener ${max} o menos caracteres`),
  email: yup
    .string()
    .email(emailErrorText)
    .max(
      emailMaxCharacters,
      ({ max }) => `Debe tener ${max} o menos caracteres`
    ),
})

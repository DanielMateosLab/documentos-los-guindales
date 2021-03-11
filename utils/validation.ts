import * as yup from "yup"

export const safeConductValidator = yup.object().shape({
  name: yup.string().required().min(2).max(55),
  identityDocument: yup.string().required().min(3).max(55),
  gender: yup.string(),
  email: yup.string().email(),
})

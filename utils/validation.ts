import * as yup from "yup"

export const safeConductValidator = yup.object().shape({
  name: yup.string().required().min(2).max(55),
  identityDocument: yup.string().required().min(3).max(55),
  gender: yup
    .string()
    .test(
      "isGender",
      (value) => value == undefined || value == "male" || value == "female"
    ),
  email: yup.string().email(),
})

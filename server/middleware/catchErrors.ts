import { yupToFormErrors } from "formik"
import { NextApiHandler } from "next"
import { ErrorResponse } from "utils/types"
import { ValidationError } from "yup"

const catchErrors = (handler: NextApiHandler<any>) =>
  (async (req, res) => {
    try {
      await handler(req, res)
    } catch (e) {
      console.error(e)
      if (e instanceof ValidationError) {
        return res.status(400).json({
          status: "error",
          name: e.name,
          message: "Validation Error",
          payload: yupToFormErrors(e),
        })
      }

      return res.status(e.statusCode || 500).json({
        status: "error",
        name: e.name || "InternalServerError",
        message: e.message || "Internal Server Error",
      })
    }
  }) as NextApiHandler<ErrorResponse<{}>>

export default catchErrors

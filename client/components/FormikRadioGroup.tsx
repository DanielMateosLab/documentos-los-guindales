import { FormControl, FormLabel, makeStyles } from "@material-ui/core"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"
import RadioGroup from "@material-ui/core/RadioGroup"
import { FieldHookConfig, useField } from "formik"
import React from "react"

const renderOptions = (options: string[]) => {
  return options.map((option) => (
    <FormControlLabel
      key={option}
      value={option}
      control={<Radio />}
      label={option}
    />
  ))
}

const useStyles = makeStyles((theme) => ({
  actionTitle: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(1),
  },
}))

type Props = FieldHookConfig<any> & { label: string }
const FormikRadioGroup = ({
  label,
  form: { touched, errors },
  options,
  children,
  ...props
}: Props) => {
  const [field, meta] = useField(props)
  const styles = useStyles()

  return (
    <FormControl component="fieldset">
      <div className={styles.actionTitle}>
        <FormLabel component="legend">{label}</FormLabel>
      </div>
      <RadioGroup aria-label="action" name="action">
        <FormControlLabel value="send" control={<Radio />} label={openLabel} />
        <FormControlLabel
          value="open"
          control={<Radio />}
          label={sendToMailLabel}
        />
      </RadioGroup>

      <RadioGroup {...field} {...props} name={fieldName}>
        {/* Here you either map over the props and render radios from them,
                   or just render the children if you're using the function as a child*/}
        {options ? renderOptions(options) : children}
      </RadioGroup>

      {touched[fieldName] && errors[fieldName] && (
        <span style={{ color: "red", fontFamily: "sans-serif" }}>
          {errors[fieldName]}
        </span>
      )}
    </FormControl>
  )
}

export default FormikRadioGroup

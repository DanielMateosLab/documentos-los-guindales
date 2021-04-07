import { FormControl, FormLabel } from "@material-ui/core"
import FormControlLabel from "@material-ui/core/FormControlLabel"
import Radio from "@material-ui/core/Radio"
import RadioGroup, { RadioGroupProps } from "@material-ui/core/RadioGroup"
import { FieldHookConfig, useField } from "formik"
import React from "react"

type OptionLabel = string
/** The first option will be set by default unless startUnset is true*/
interface RadioOptions {
  [key: string]: OptionLabel
}

type Props = FieldHookConfig<any> &
  RadioGroupProps & {
    label: string
    options: RadioOptions
    startUnset?: boolean
  }
/**
 * A Material UI RadioGroup to use with Formik.
 * @property {RadioOptions} options - An object containing the radio group options.
 * The key is a needed option name, and the value will be the option label shown in the UI.
 * @property {boolean} startUnset - Wether to set the first option as default. Defaults to false.
 *  */
const FormikRadioGroup = ({
  label,
  children,
  options,
  startUnset = false,
  ...props
}: Props) => {
  const firstOption = Object.keys(options)[0]
  const [field, meta, helpers] = useField({
    ...props,
    type: "radio",
    // TODO: fix this: value: startUnset == false ? firstOption : undefined,
  })

  const Options = () => (
    <>
      {Object.keys(options).map((option) => (
        <FormControlLabel
          key={option}
          value={option}
          control={<Radio />}
          label={options[option]}
        />
      ))}
    </>
  )

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup
        aria-label={props.name}
        name={props.name}
        value={field.value}
        onChange={(event) => helpers.setValue(event.target.value)}
      >
        <Options />
      </RadioGroup>
    </FormControl>
  )
}

export default FormikRadioGroup

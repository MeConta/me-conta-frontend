import { InputHTMLAttributes, useState } from 'react'
import { TextField } from '../TextField'
import {
  formatPhoneNumber,
  removePhoneMask
} from '../../../utils/format-string/helpers'

const phonePlaceHolder = '(##) # ####-####'

export type PhoneFieldProps = {
  label?: string
  initialValue?: string
  error?: string
  disabled?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export function PhoneField({
  label,
  name,
  initialValue = '',
  error,
  disabled,
  ...props
}: PhoneFieldProps) {
  // Rever Type
  const [value, setValue] = useState<string>('')

  const onChange = (value: string) => {
    const newValue = removePhoneMask(value)
    console.log(newValue)
    setValue(newValue)
    return newValue
  }

  return (
    <TextField
      label={label}
      name={name}
      maxLength={16}
      initialValue={initialValue}
      value={formatPhoneNumber(value)}
      inputChange={onChange}
      placeholder={phonePlaceHolder}
      error={error}
      disabled={disabled}
      {...props}
    />
  )
}

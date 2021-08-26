import { InputHTMLAttributes, useState } from 'react'
import { TextField } from '../TextField'
import { formatPhoneNumber, removePhoneMask } from 'utils/format-string'

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
    setValue(newValue)
    return newValue
  }

  return (
    <TextField
      label={label}
      name={name}
      maxLength={15}
      initialValue={initialValue}
      value={formatPhoneNumber(value)}
      inputChange={onChange}
      // placeholder={maskPropriety[mask].placeHolder}
      error={error}
      disabled={disabled}
      {...props}
    />
  )
}

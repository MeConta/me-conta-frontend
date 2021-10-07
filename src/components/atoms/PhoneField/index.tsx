import { InputHTMLAttributes } from 'react'
import { TextField } from '../TextField'

const phonePlaceHolder = '(##) # ####-####'

export type PhoneFieldProps = {
  label: string
  name: string
  initialValue?: string
  error?: string
  disabled?: boolean
  value?: string
} & InputHTMLAttributes<HTMLInputElement>

export function PhoneField({
  label,
  name,
  initialValue = '',
  error,
  disabled,
  value,
  onChange,
  ...props
}: PhoneFieldProps) {
  return (
    <TextField
      label={label}
      name={name}
      maxLength={15}
      initialValue={initialValue}
      value={value}
      onChange={onChange}
      placeholder={phonePlaceHolder}
      error={error}
      disabled={disabled}
      {...props}
    />
  )
}

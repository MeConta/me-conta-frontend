import {
  ChangeEvent,
  ChangeEventHandler,
  InputHTMLAttributes,
  useState
} from 'react'
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
  value?: string
  onChange?: ChangeEventHandler<any> | undefined
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = removePhoneMask(e.target.value)
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
      onChange={handleChange}
      placeholder={phonePlaceHolder}
      error={error}
      disabled={disabled}
      {...props}
    />
  )
}

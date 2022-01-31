import React, {
  ChangeEventHandler,
  ForwardedRef,
  TextareaHTMLAttributes
} from 'react'
import { FormGroup } from '../FormGroup'
import * as S from './styles'

export type TextAreaFieldProps = {
  label: string
  error?: string
  disabled?: boolean
  required?: boolean
  value?: string
  name: string
  onChange?: ChangeEventHandler<any> | undefined
} & TextareaHTMLAttributes<HTMLTextAreaElement>

export const TextAreaField = React.forwardRef(function TextAreaField(
  {
    label,
    name,
    onChange,
    value,
    error,
    disabled,
    required,
    ...props
  }: TextAreaFieldProps,
  ref?: ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <FormGroup label={label} name={name} error={error} required={required}>
      <S.TextArea
        value={value}
        onChange={onChange}
        name={name}
        disabled={disabled}
        required={required}
        id={name}
        ref={ref}
        {...props}
      />
    </FormGroup>
  )
})

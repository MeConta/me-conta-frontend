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
    ...props
  }: TextAreaFieldProps,
  ref?: ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <FormGroup label={label} name={name} error={error}>
      <S.TextArea
        value={value}
        onChange={onChange}
        name={name}
        disabled={disabled}
        id={name}
        ref={ref}
        {...props}
      />
    </FormGroup>
  )
})

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
  onChange: ChangeEventHandler<any> | undefined
  showCharCounter?: boolean
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
    showCharCounter,
    ...props
  }: TextAreaFieldProps,
  ref?: ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <FormGroup
      label={label}
      name={name}
      error={error}
      required={required}
      extraContent={
        !!showCharCounter &&
        !!props.maxLength && (
          <S.CharCounter error={error}>
            {value?.length || 0}/{props?.maxLength}
          </S.CharCounter>
        )
      }
    >
      <S.TextArea
        value={value}
        onChange={onChange}
        name={name}
        disabled={disabled}
        required={required}
        id={name}
        aria-describedby="error-message"
        ref={ref}
        {...props}
      />
    </FormGroup>
  )
})

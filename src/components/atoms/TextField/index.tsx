import React, {
  InputHTMLAttributes,
  ReactNode,
  ChangeEventHandler,
  ForwardedRef
} from 'react'
import { FormGroup } from '../FormGroup'

import * as S from './styles'

export type TextFieldProps = {
  label: string
  initialValue?: string
  error?: string
  disabled?: boolean
  type?: string
  children?: ReactNode
  value?: string | number
  name: string
  onChange?: ChangeEventHandler<any> | undefined
} & InputHTMLAttributes<HTMLInputElement>

export const TextField = React.forwardRef(function TextField(
  {
    label,
    name,
    onChange,
    value,
    error,
    disabled,
    type = 'text',
    children,
    ...props
  }: TextFieldProps,
  ref?: ForwardedRef<HTMLInputElement>
) {
  return (
    <FormGroup label={label} name={name} error={error}>
      {children}
      <S.Input
        value={value}
        onChange={onChange}
        name={name}
        disabled={disabled}
        type={type}
        id={name}
        ref={ref}
        {...props}
      />
    </FormGroup>
  )
})

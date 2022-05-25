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
  required?: boolean
  showPopover?: boolean
  popover?: ReactNode
  onChange: ChangeEventHandler<any> | undefined
} & InputHTMLAttributes<HTMLInputElement>

export const TextField = React.forwardRef(function TextField(
  {
    label,
    name,
    onChange,
    value,
    error,
    disabled,
    required,
    type = 'text',
    showPopover,
    popover,
    children,
    ...props
  }: TextFieldProps,
  ref?: ForwardedRef<HTMLInputElement>
) {
  return (
    <FormGroup
      label={label}
      name={name}
      error={error}
      required={required}
      showPopover={showPopover}
      popover={popover}
    >
      {children}
      <S.Input
        data-testid="textField"
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

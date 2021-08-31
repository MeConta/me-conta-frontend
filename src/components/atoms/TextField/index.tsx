import { InputHTMLAttributes, ReactNode, ChangeEventHandler } from 'react'
import { FormGroup } from '../FormGroup'

import * as S from './styles'

export type TextFieldProps = {
  label: string
  initialValue?: string
  error?: string
  disabled?: boolean
  type?: string
  children?: ReactNode
  value?: string
  name: string
  onChange?: ChangeEventHandler<any> | undefined
} & InputHTMLAttributes<HTMLInputElement>

export function TextField({
  label,
  name,
  onChange,
  value,
  error,
  disabled,
  type = 'text',
  children,
  ...props
}: TextFieldProps) {
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
        {...props}
      />
    </FormGroup>
  )
}

import { InputHTMLAttributes, ReactNode, ChangeEventHandler } from 'react'

import * as S from './styles'

export type TextFieldProps = {
  label?: string
  initialValue?: string
  error?: string
  disabled?: boolean
  type?: string
  children?: ReactNode
  value?: string
  onChange?: ChangeEventHandler<any> | undefined
} & InputHTMLAttributes<HTMLInputElement>

export function TextField({
  label,
  name,
  initialValue = '',
  onChange,
  value,
  error,
  disabled,
  type = 'text',
  children,
  ...props
}: TextFieldProps) {
  return (
    <S.Wrapper disabled={disabled} error={!!error}>
      {!!label && <S.Label htmlFor={name}>{label}</S.Label>}
      <S.InputWrapper>
        {children}
        <S.Input
          value={value}
          onChange={onChange}
          name={name}
          disabled={disabled}
          type={type}
          {...(!!label ? { id: name } : {})}
          {...props}
        />
      </S.InputWrapper>
      {!!error && <S.Error> {error} </S.Error>}
    </S.Wrapper>
  )
}

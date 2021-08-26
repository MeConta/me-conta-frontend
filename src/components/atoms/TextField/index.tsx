import { ChangeEvent, InputHTMLAttributes, useState, ReactNode } from 'react'

import * as S from './styles'

export type TextFieldProps = {
  label?: string
  value?: string
  inputChange?: (value: string) => void
  initialValue?: string
  error?: string
  disabled?: boolean
  type?: string
  children?: ReactNode
} & InputHTMLAttributes<HTMLInputElement>

export function TextField({
  label,
  name,
  initialValue = '',
  inputChange,
  value,
  error,
  disabled,
  type = 'text',
  children,
  ...props
}: TextFieldProps) {
  const [valueDefault, setValueDefault] = useState(initialValue)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValueDefault(e.currentTarget.value)
    {
      inputChange && inputChange(e.currentTarget.value)
    }
  }

  return (
    <S.Wrapper disabled={disabled} error={!!error}>
      {!!label && <S.Label htmlFor={name}>{label}</S.Label>}
      <S.InputWrapper>
        {children}
        <S.Input
          value={value || valueDefault}
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

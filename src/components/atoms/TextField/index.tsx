import { ChangeEvent, InputHTMLAttributes, useState } from 'react'

import * as S from './styles'
// import { EyeFill } from '@styled-icons/bootstrap'

export type TextInputProps = {
  label?: string
  inputChange?: (value: string) => void
  initialValue?: string
  error?: string
  disabled?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export function TextInput({
  label,
  name,
  initialValue = '',
  inputChange,
  error,
  disabled,
  ...props
}: TextInputProps) {
  const [value, setValue] = useState(initialValue)

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
    {
      inputChange && inputChange(e.currentTarget.value)
    }
  }

  return (
    <S.Wrapper disabled={disabled} error={!!error}>
      {!!label && <S.Label htmlFor={name}>{label}</S.Label>}
      <S.InputWrapper>
        <S.Input
          value={value}
          onChange={onChange}
          name={name}
          disabled={disabled}
          {...(!!label ? { id: name } : {})}
          {...props}
        />
      </S.InputWrapper>
      {!!error && <S.Error> {error} </S.Error>}
    </S.Wrapper>
  )
}

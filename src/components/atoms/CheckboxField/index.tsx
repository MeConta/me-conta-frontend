import { InputHTMLAttributes, ChangeEventHandler } from 'react'

import * as S from './styles'

export type CheckboxFieldProps = {
  label?: string
  initialValue?: string
  error?: string
  disabled?: boolean
  value?: string
  onChange?: ChangeEventHandler<any> | undefined
} & InputHTMLAttributes<HTMLInputElement>

export function CheckboxField({
  label,
  name,
  onChange,
  value,
  error,
  disabled,
  ...props
}: CheckboxFieldProps) {
  return (
    <S.Wrapper>
      <S.InputWrapper>
        <S.Input
          value={value}
          onChange={onChange}
          name={name}
          disabled={disabled}
          type="checkbox"
          {...(!!label ? { id: name } : {})}
          {...props}
        />
        {!!label && <S.Label htmlFor={name}>{label}</S.Label>}
      </S.InputWrapper>
      {!!error && <S.Error> {error} </S.Error>}
    </S.Wrapper>
  )
}

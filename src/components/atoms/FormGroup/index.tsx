import { ReactNode } from 'react'

import * as S from './styles'

export type FormGroupProps = {
  label: string
  error?: string
  required?: boolean
  children: ReactNode
  name: string
}

export function FormGroup({
  label,
  name,
  required,
  error,
  children
}: FormGroupProps) {
  return (
    <S.Wrapper error={error}>
      {!!label && (
        <S.Label htmlFor={name} aria-required={required} data-testid={label}>
          {label}
        </S.Label>
      )}
      <S.InputWrapper>{children}</S.InputWrapper>
      {!!error && <S.Error> {error} </S.Error>}
    </S.Wrapper>
  )
}

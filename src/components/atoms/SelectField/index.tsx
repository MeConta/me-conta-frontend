import { InputHTMLAttributes, ReactNode, ChangeEventHandler } from 'react'

import * as S from './styles'

type Option = {
  label: string
  value: string
}

export type SelectFieldProps = {
  label?: string
  initialValue?: string
  error?: string
  disabled?: boolean
  options: Option[]
  type?: string
  children?: ReactNode
  value?: string
  defaultSelect?: string
  name: string
  onChange?: ChangeEventHandler<any> | undefined
}

export function SelectField({
  label,
  name,
  initialValue = '',
  onChange,
  value,
  options,
  error,
  disabled,
  children,
  defaultSelect,
  ...props
}: SelectFieldProps) {
  return (
    <S.Wrapper disabled={disabled} error={!!error}>
      {!!label && <S.Label htmlFor={name}>{label}</S.Label>}
      <S.InputWrapper>
        <S.Select
          onChange={onChange}
          name={name}
          disabled={disabled}
          {...(!!label ? { id: name } : {})}
          {...props}
        >
          <S.DefaultOption disabled selected value="">
            {defaultSelect || 'Selecione'}
          </S.DefaultOption>
          {options.map(({ value, label }: Option, index) => (
            <option key={index} value={value}>
              {label}
            </option>
          ))}
        </S.Select>
      </S.InputWrapper>
      {!!error && <S.Error> {error} </S.Error>}
    </S.Wrapper>
  )
}

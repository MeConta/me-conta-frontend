import { InputHTMLAttributes, ChangeEventHandler } from 'react'

import * as S from './styles'

export type RadioFieldProps = {
  label?: string
  initialValue?: string
  error?: string
  disabled?: boolean
  options: {
    value: string | number
    label: string
  }[]
  name: string
  value?: string | number
  role?: string
  onChange?: ChangeEventHandler<any> | undefined
} & InputHTMLAttributes<HTMLInputElement>

export function RadioField({
  label,
  name,
  value,
  onChange,
  options,
  error,
  disabled,
  role = 'radio',
  ...props
}: RadioFieldProps) {
  const renderRadioInput = () =>
    options.map((option, index) => (
      <S.InputWrapper key={index}>
        <S.Input
          value={option.value}
          checked={value == option.value}
          onChange={onChange}
          name={name}
          disabled={disabled}
          type="radio"
          role={role}
          {...(!!label ? { id: option.label } : {})}
          {...props}
        />
        {value}
        {<S.RadioValue htmlFor={option.label}>{option.label}</S.RadioValue>}
      </S.InputWrapper>
    ))

  return (
    <S.Wrapper disabled={disabled} error={!!error}>
      {!!label && <S.Label htmlFor={name}>{label}</S.Label>}
      <S.RadioGroup id={name}>{renderRadioInput()}</S.RadioGroup>
      {!!error && <S.Error> {error} </S.Error>}
    </S.Wrapper>
  )
}

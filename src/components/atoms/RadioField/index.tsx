import { InputHTMLAttributes, ChangeEventHandler } from 'react'

import * as S from './styles'

export type RadioFieldProps = {
  label?: string
  initialValue?: string
  error?: string
  disabled?: boolean
  options: string[]
  name: string
  value?: string
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
          value={option}
          checked={value === option}
          onChange={onChange}
          name={name}
          disabled={disabled}
          type="radio"
          role={role}
          {...(!!label ? { id: option } : {})}
          {...props}
        />
        {<S.RadioValue htmlFor={option}>{option}</S.RadioValue>}
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

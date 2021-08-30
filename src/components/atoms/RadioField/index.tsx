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
  onChange?: ChangeEventHandler<any> | undefined
} & InputHTMLAttributes<HTMLInputElement>

export function RadioField({
  label,
  name,
  initialValue = '',
  onChange,
  value,
  options,
  error,
  disabled,
  ...props
}: RadioFieldProps) {
  const renderRadioInput = () =>
    options.map((value, index) => (
      <S.InputWrapper key={index}>
        <S.Input
          value={value}
          id={value}
          onChange={onChange}
          name={name}
          disabled={disabled}
          type="radio"
          {...(!!label ? { id: name } : {})}
          {...props}
        />
        {<S.RadioValue htmlFor={value}>{value}</S.RadioValue>}
      </S.InputWrapper>
    ))

  return (
    <S.Wrapper disabled={disabled} error={!!error}>
      {!!label && <S.Label htmlFor={name}>{label}</S.Label>}
      <S.RadioGroup>{renderRadioInput()}</S.RadioGroup>
      {!!error && <S.Error> {error} </S.Error>}
    </S.Wrapper>
  )
}

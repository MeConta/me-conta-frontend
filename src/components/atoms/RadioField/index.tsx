import React, {
  InputHTMLAttributes,
  ChangeEventHandler,
  ForwardedRef
} from 'react'

import * as S from './styles'

export type RadioFieldProps = {
  label?: string
  initialValue?: string | number
  error?: string
  disabled?: boolean
  required?: boolean
  options: {
    value: string | number
    label: string
  }[]
  name: string
  value?: string | number
  role?: string
  onChange: ChangeEventHandler<any> | undefined
} & InputHTMLAttributes<HTMLInputElement>

export const RadioField = React.forwardRef(function RadioField(
  {
    label,
    name,
    value,
    onChange,
    options,
    error,
    disabled,
    required,
    role = 'radio',
    ...props
  }: RadioFieldProps,
  ref?: ForwardedRef<HTMLInputElement>
) {
  const renderRadioInput = () =>
    options.map((option, index) => (
      <S.InputWrapper key={index}>
        <S.Input
          value={option.value}
          checked={value != null ? value == option.value : undefined}
          onChange={onChange}
          name={name}
          disabled={disabled}
          type="radio"
          role={role}
          ref={ref}
          {...(!!label ? { id: option.label } : {})}
          {...props}
        />
        {<S.RadioValue htmlFor={option.label}>{option.label}</S.RadioValue>}
      </S.InputWrapper>
    ))

  return (
    <S.Wrapper disabled={disabled} error={!!error}>
      {!!label && (
        <S.Label htmlFor={name} aria-required={required} data-testid={label}>
          {label}
        </S.Label>
      )}
      <S.RadioGroup id={name}>{renderRadioInput()}</S.RadioGroup>
      {!!error && <S.Error> {error} </S.Error>}
    </S.Wrapper>
  )
})

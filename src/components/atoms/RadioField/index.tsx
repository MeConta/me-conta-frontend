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
  display?: 'two-columns'
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
    display,
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
        {
          <S.RadioValue htmlFor={option.label}>
            {setBoldTextInParentheses(option.label)}
          </S.RadioValue>
        }
      </S.InputWrapper>
    ))

  const setBoldTextInParentheses = (label: string) => {
    if (!label.includes('(')) return label

    const labelText = label?.split('(')
    labelText[1] = '(' + labelText[1]

    return (
      labelText && (
        <>
          {labelText[0]}
          <b>{labelText[1]}</b>
        </>
      )
    )
  }

  return (
    <S.Wrapper disabled={disabled} error={!!error}>
      {!!label && (
        <S.Label htmlFor={name} aria-required={required} data-testid={label}>
          {label}
        </S.Label>
      )}
      <S.RadioGroup id={name} display={display}>
        {renderRadioInput()}
      </S.RadioGroup>
      {!!error && <S.Error> {error} </S.Error>}
    </S.Wrapper>
  )
})

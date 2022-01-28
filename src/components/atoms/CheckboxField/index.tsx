import React, {
  InputHTMLAttributes,
  ChangeEventHandler,
  ForwardedRef
} from 'react'

import * as S from './styles'

export type CheckboxFieldProps = {
  label?: string | any
  initialValue?: string | number | boolean
  error?: string
  disabled?: boolean
  required?: boolean
  value?: string | number | boolean
  onChange?: ChangeEventHandler<any> | undefined
} & InputHTMLAttributes<HTMLInputElement>

export const CheckboxField = React.forwardRef(function CheckboxField(
  {
    label,
    name,
    onChange,
    value,
    error,
    disabled,
    required,
    ...props
  }: CheckboxFieldProps,
  ref?: ForwardedRef<HTMLInputElement>
) {
  return (
    <S.Wrapper disabled={disabled}>
      <S.InputWrapper>
        <S.Input
          value={value}
          onChange={onChange}
          name={name}
          disabled={disabled}
          type="checkbox"
          ref={ref}
          {...(!!label ? { id: name } : {})}
          {...props}
        />
        {!!label && (
          <S.Label htmlFor={name} aria-required={required}>
            {label}
          </S.Label>
        )}
      </S.InputWrapper>
      {!!error && <S.Error> {error} </S.Error>}
    </S.Wrapper>
  )
})

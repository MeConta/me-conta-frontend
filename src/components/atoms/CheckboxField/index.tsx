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
  margin?: 'small' | 'xsmall' | 'xxsmall' | 'xxxsmall' | 'zero'
  value?: string | number | boolean
  onChange: ChangeEventHandler<any> | undefined
} & InputHTMLAttributes<HTMLInputElement>

export const CheckboxField = React.forwardRef(function CheckboxField(
  {
    label,
    name,
    onChange,
    margin,
    value,
    error,
    disabled,
    required = true,
    ...props
  }: CheckboxFieldProps,
  ref?: ForwardedRef<HTMLInputElement>
) {
  return (
    <S.Wrapper disabled={disabled} margin={margin}>
      <S.InputWrapper margin={margin}>
        <S.Input
          value={value}
          onChange={onChange}
          name={name}
          disabled={disabled}
          type="checkbox"
          ref={ref}
          {...(!!label ? { id: label } : {})}
          {...props}
        />
        {!!label && (
          <S.Label htmlFor={label} aria-required={required} data-testid={label}>
            {label}
          </S.Label>
        )}
      </S.InputWrapper>
      {!!error && <S.Error> {error} </S.Error>}
    </S.Wrapper>
  )
})

import React, { ChangeEvent, ForwardedRef, InputHTMLAttributes } from 'react'
import InputMask, { ReactInputMask } from 'react-input-mask'
import { FormGroup } from '../FormGroup'
import * as S from './styles'

export type PhoneFieldProps = {
  label: string
  name: string
  error?: string
  required?: boolean
  value?: string
} & InputHTMLAttributes<HTMLInputElement>

export const PhoneField = React.forwardRef(function PhoneField(
  { label, name, error, value, onChange, required, ...props }: PhoneFieldProps,
  ref?: ForwardedRef<ReactInputMask>
) {
  const removePhoneMask = (inputValue: string): string => {
    return inputValue.replace(/\D/g, '')
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    event.target.value = removePhoneMask(inputValue)
    if (onChange) {
      onChange(event)
    }
  }

  const maskBuilder = (phoneNumber: string | undefined): string => {
    if (!phoneNumber || phoneNumber.length == 0) return ''
    const clearValue = removePhoneMask(phoneNumber)
    return clearValue.length >= 10 && clearValue[2] === '9'
      ? '(99) 99999-9999'
      : '(99) 9999-9999'
  }

  return (
    <FormGroup label={label} name={name} required={required} error={error}>
      <S.InputWrapper>
        <InputMask
          placeholder="(DDD) + número"
          mask={maskBuilder(value)}
          onBlur={props.onBlur}
          onChange={handleChange}
          value={value}
          name={name}
          id={name}
          ref={ref}
          {...props}
        />
      </S.InputWrapper>
    </FormGroup>
  )
})

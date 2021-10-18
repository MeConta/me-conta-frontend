import React, { useState, ChangeEvent, InputHTMLAttributes } from 'react'
import InputMask from 'react-input-mask'
import { FormGroup } from '../FormGroup'
import * as S from './styles'

React.useLayoutEffect = React.useEffect

export type PhoneFieldProps = {
  label: string
  name: string
  error?: string
  value?: string
} & InputHTMLAttributes<HTMLInputElement>

export function PhoneField({
  label,
  name,
  error,
  value,
  onChange,
  ...props
}: PhoneFieldProps) {
  const removePhoneMask = (inputValue: string): string => {
    const onlyPhoneNumbers = inputValue.replace(/\D/g, '')
    return onlyPhoneNumbers
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    event.target.value = removePhoneMask(inputValue)
    if (onChange) {
      onChange(event)
    }
  }

  const maskBuilder = (value: string | undefined): string => {
    if (!value || value.length == 0) return ''
    const clearValue = removePhoneMask(value)
    return clearValue.length >= 10 && clearValue[2] === '9'
      ? '(99) 99999-9999'
      : '(99) 9999-9999'
  }

  return (
    <FormGroup label={label} name={name} error={error}>
      <S.InputWrapper>
        <InputMask
          mask={maskBuilder(value)}
          onBlur={props.onBlur}
          onChange={handleChange}
          value={value}
          name={name}
          id={name}
          {...props}
        />
      </S.InputWrapper>
    </FormGroup>
  )
}

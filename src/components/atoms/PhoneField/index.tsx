import React, { ChangeEvent, InputHTMLAttributes } from 'react'
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
  return (
    <FormGroup label={label} name={name} error={error}>
      <S.InputWrapper>
        <InputMask
          mask={'(99) 99999-9999'}
          onBlur={props.onBlur}
          onChange={onChange}
          value={value}
          name={name}
          id={name}
          {...props}
        />
      </S.InputWrapper>
    </FormGroup>
  )
}

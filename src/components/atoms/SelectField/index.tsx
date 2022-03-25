import React, { ReactNode, ChangeEventHandler, ForwardedRef } from 'react'
import { FormGroup } from '../FormGroup'

import * as S from './styles'

type Option = {
  label: string
  value: string | number
}

export type SelectFieldProps = {
  labelField: string
  initialValue?: string
  error?: string
  disabled?: boolean
  required?: boolean
  options: Option[]
  type?: string
  children?: ReactNode
  value?: string
  defaultSelect?: string
  name: string
  onChange: ChangeEventHandler<any> | undefined
}

export const SelectField = React.forwardRef(function SelectField(
  {
    labelField,
    name,
    onChange,
    options,
    error,
    disabled,
    required,
    defaultSelect,
    ...props
  }: SelectFieldProps,
  ref?: ForwardedRef<HTMLSelectElement>
) {
  return (
    <FormGroup error={error} name={name} label={labelField} required={required}>
      <S.Select
        onChange={onChange}
        name={name}
        disabled={disabled}
        id={name}
        ref={ref}
        {...props}
      >
        <option disabled value="">
          {defaultSelect || 'Selecione'}
        </option>
        {options.map(({ value, label }: Option, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </S.Select>
    </FormGroup>
  )
})

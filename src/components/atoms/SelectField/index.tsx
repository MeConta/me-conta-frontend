import { ReactNode, ChangeEventHandler } from 'react'
import { FormGroup } from '../FormGroup'

import * as S from './styles'

type Option = {
  label: string
  value: string | number
}

export type SelectFieldProps = {
  label: string
  initialValue?: string
  error?: string
  disabled?: boolean
  options: Option[]
  type?: string
  children?: ReactNode
  value?: string
  defaultSelect?: string
  name: string
  onChange?: ChangeEventHandler<any> | undefined
}

export function SelectField({
  label,
  name,
  onChange,
  options,
  error,
  disabled,
  defaultSelect,
  ...props
}: SelectFieldProps) {
  return (
    <FormGroup error={error} name={name} label={label}>
      <S.Select
        onChange={onChange}
        name={name}
        disabled={disabled}
        id={name}
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
}

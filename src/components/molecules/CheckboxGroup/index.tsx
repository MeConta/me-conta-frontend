import { CheckboxField } from '../../atoms/CheckboxField'
import * as S from './styles'
import React, { useState, ForwardedRef } from 'react'

export type CheckboxGroupProps = {
  required?: boolean
  label?: string
  options: {
    value: string | number
    label: string
  }[]
  name: string
  error?: string
  subtitle?: string
  onChange: Function
  value?: Array<string | number>
}

export const CheckboxGroup = React.forwardRef(function CheckboxGroup(
  {
    required,
    label,
    options,
    name,
    error,
    subtitle,
    onChange,
    value: defaultValues
  }: CheckboxGroupProps,
  ref?: ForwardedRef<HTMLInputElement>
) {
  const [checkedValues, setCheckedValues] = useState<Array<number | string>>(
    defaultValues ?? []
  )

  const isAlreadyChecked = (
    previousValues: Array<number | string> | undefined,
    checkboxValue: number | string
  ) => {
    return previousValues?.includes(checkboxValue)
  }

  const updateCheckedValuesArray = (
    previousValues: Array<string | number>,
    checkboxValue: string | number
  ) => {
    if (previousValues?.length === 0) return [checkboxValue]

    if (isAlreadyChecked(previousValues, checkboxValue))
      return previousValues?.filter((value) => value !== checkboxValue)
    else return [...previousValues, checkboxValue]
  }

  const handleCheckboxChange = (checkboxValue: number | string) => {
    const updatedValues = updateCheckedValuesArray(checkedValues, checkboxValue)
    setCheckedValues(updatedValues)
    onChange(updatedValues)
  }

  const renderCheckboxInputs = () =>
    options.map((option, index) => (
      <CheckboxField
        key={index}
        label={option.label}
        value={option.value}
        name={name}
        ref={ref}
        checked={isAlreadyChecked(defaultValues, option.value)}
        required={false}
        onChange={() => {
          handleCheckboxChange(option.value)
        }}
        margin="xxxsmall"
      />
    ))

  return (
    <S.Wrapper errorActive={!!error}>
      {!!label && (
        <S.Label aria-required={required} data-testid={label}>
          {label}
        </S.Label>
      )}
      {!!subtitle && <S.Subtitle> {subtitle} </S.Subtitle>}
      <S.CheckboxGroup id={name}>{renderCheckboxInputs()}</S.CheckboxGroup>
      {!!error && <S.Error> {error} </S.Error>}
    </S.Wrapper>
  )
})

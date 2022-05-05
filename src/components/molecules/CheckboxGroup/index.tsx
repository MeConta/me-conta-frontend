import { CheckboxField } from '../../atoms/CheckboxField'
import * as S from './styles'
import { useState } from 'react'

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
}

export function CheckboxGroup({
  required,
  label,
  options,
  name,
  error,
  subtitle,
  onChange
}: CheckboxGroupProps) {
  const [checkedValues, setCheckedValues] = useState<Array<number | string>>([])

  const updateCheckedValuesArray = (
    previousValues: Array<string | number>,
    checkboxValue: string | number
  ) => {
    if (previousValues?.length === 0) return [checkboxValue]

    if (previousValues?.includes(checkboxValue))
      return previousValues?.filter((value) => value !== checkboxValue)
    else return [...previousValues, checkboxValue]
  }

  const handleCheckboxChange = (checkboxValue: number | string) => {
    const updatedValues = updateCheckedValuesArray(checkedValues, checkboxValue)
    setCheckedValues(updatedValues)
    onChange(updatedValues)
  }

  const renderCheckboxInput = () =>
    options.map((option, index) => (
      <CheckboxField
        key={index}
        label={option.label}
        value={option.value}
        name={name}
        required={false}
        onChange={() => {
          handleCheckboxChange(option.value)
        }}
        margin="xxxsmall"
      />
    ))

  return (
    <S.Wrapper>
      {!!label && (
        <S.Label aria-required={required} data-testid={label}>
          {label}
        </S.Label>
      )}
      {!!subtitle && <S.Subtitle> {subtitle} </S.Subtitle>}
      <S.CheckboxGroup id={name}>{renderCheckboxInput()}</S.CheckboxGroup>
      {!!error && <S.Error> {error} </S.Error>}
    </S.Wrapper>
  )
}

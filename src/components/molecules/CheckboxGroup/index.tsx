import { CheckboxField } from '../../atoms/CheckboxField'
import * as S from './styles'
import { ChangeEventHandler } from 'react'

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
  onChange: ChangeEventHandler<any> | undefined
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
  const renderCheckboxInput = () =>
    options.map((option, index) => (
      <CheckboxField
        key={index}
        label={option.label}
        value={option.value}
        name={name}
        required={false}
        onChange={onChange}
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

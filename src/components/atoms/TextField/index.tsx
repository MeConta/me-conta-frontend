import { ChangeEvent, InputHTMLAttributes, useState } from 'react'

import { EyeFill, EyeSlashFill } from '@styled-icons/bootstrap'

import * as S from './styles'

export type TextInputProps = {
  label?: string
  inputChange?: (value: string) => void
  initialValue?: string
  error?: string
  disabled?: boolean
  hasIcon?: boolean
} & InputHTMLAttributes<HTMLInputElement>

type ToggleType = 'password' | 'text'

export function TextInput({
  label,
  name,
  initialValue = '',
  inputChange,
  error,
  disabled,
  hasIcon = false,
  type,
  ...props
}: TextInputProps) {
  const [value, setValue] = useState(initialValue)
  const [toggleType, setToggleType] = useState<ToggleType>('password')

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
    {
      inputChange && inputChange(e.currentTarget.value)
    }
  }

  const toggleIcon = () => {
    if (toggleType === 'password') {
      setToggleType('text')
    } else {
      setToggleType('password')
    }
  }

  const _type = hasIcon ? toggleType : type

  const icon = {
    password: <EyeFill data-testid="fillIcon" />,
    text: <EyeSlashFill data-testid="slashIcon" />
  }

  return (
    <S.Wrapper disabled={disabled} error={!!error}>
      {!!label && <S.Label htmlFor={name}>{label}</S.Label>}
      <S.InputWrapper>
        {hasIcon && <S.Icon onClick={toggleIcon}>{icon[toggleType]}</S.Icon>}
        <S.Input
          value={value}
          onChange={onChange}
          name={name}
          disabled={disabled}
          type={_type}
          {...(!!label ? { id: name } : {})}
          {...props}
        />
      </S.InputWrapper>
      {!!error && <S.Error> {error} </S.Error>}
    </S.Wrapper>
  )
}

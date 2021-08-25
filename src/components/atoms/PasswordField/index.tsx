import { InputHTMLAttributes, useState } from 'react'

import { EyeFill, EyeSlashFill } from '@styled-icons/bootstrap'
import { TextField } from '../TextField'

import * as S from './styles'

type ToggleType = 'text' | 'password'

export type PasswordFieldProps = {
  label?: string
  inputChange?: (value: string) => void
  initialValue?: string
  error?: string
  disabled?: boolean
} & InputHTMLAttributes<HTMLInputElement>

export function PasswordField({
  label,
  name,
  initialValue = '',
  inputChange,
  error,
  disabled,
  ...props
}: PasswordFieldProps) {
  const [toggleType, setToggleType] = useState<ToggleType>('password')

  const toggleIcon = () => {
    if (toggleType === 'password') {
      setToggleType('text')
    } else {
      setToggleType('password')
    }
  }

  const icon = {
    password: <EyeFill aria-label="Mostrar Senha" />,
    text: <EyeSlashFill aria-label="Esconder Senha" />
  }

  return (
    <TextField
      label={label}
      name={name}
      initialValue={initialValue}
      inputChange={inputChange}
      error={error}
      disabled={disabled}
      type={toggleType}
      {...props}
    >
      <S.Icon data-testid="icon" onClick={toggleIcon}>
        {icon[toggleType]}
      </S.Icon>
    </TextField>
  )
}

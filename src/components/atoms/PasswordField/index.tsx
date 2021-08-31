import { ChangeEventHandler, InputHTMLAttributes, useState } from 'react'

import { EyeFill, EyeSlashFill } from '@styled-icons/bootstrap'
import { TextField } from '../TextField'

import * as S from './styles'

type ToggleType = 'text' | 'password'

export type PasswordFieldProps = {
  label: string
  initialValue?: string
  error?: string
  disabled?: boolean
  name: string
  value?: string
  onChange?: ChangeEventHandler<any> | undefined
} & InputHTMLAttributes<HTMLInputElement>

export function PasswordField({
  label,
  name,
  initialValue = '',
  onChange,
  value,
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
      value={value}
      name={name}
      initialValue={initialValue}
      onChange={onChange}
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

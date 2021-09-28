import { ChangeEventHandler, InputHTMLAttributes, useState } from 'react'
import PasswordStrengthBar from 'react-password-strength-bar'

import { EyeFill, EyeSlashFill } from '@styled-icons/bootstrap'
import { TextField } from '../TextField'

import * as S from './styles'

type ToggleType = 'text' | 'password'

export enum ScoreWordsEnum {
  ruim,
  fraca,
  razoável,
  forte,
  incrível
}

export type PasswordFieldProps = {
  label: string
  initialValue?: string
  error?: string
  disabled?: boolean
  name: string
  value?: string
  onChange?: ChangeEventHandler<any> | undefined
  showStrengthBar?: boolean
  handleStrength?: (score: any, feedback: any) => void
} & InputHTMLAttributes<HTMLInputElement>

export function PasswordField({
  label,
  name,
  initialValue = '',
  onChange,
  value,
  error,
  disabled,
  showStrengthBar = false,
  handleStrength,
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
    <>
      <TextField
        label={label}
        value={value}
        name={name}
        role="password"
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

      {showStrengthBar && (
        <PasswordStrengthBar
          minLength={props.minLength || 8}
          password={value}
          scoreWords={Object.keys(ScoreWordsEnum).map(
            (key, value) => ScoreWordsEnum[value]
          )}
          shortScoreWord="muito curta"
          onChangeScore={handleStrength || undefined}
        />
      )}
    </>
  )
}

import React, {
  ChangeEventHandler,
  ForwardedRef,
  InputHTMLAttributes,
  useState
} from 'react'
import PasswordStrengthBar from 'react-password-strength-bar'

import { EyeFill, EyeSlashFill } from '@styled-icons/bootstrap'
import { TextField } from '../TextField'

import * as S from './styles'

type ToggleType = 'text' | 'password'

export enum ScoreWordsEnum {
  ruim,
  fraca,
  razoavel,
  forte,
  incrivel
}

export type PasswordFieldProps = {
  label: string
  initialValue?: string
  error?: string
  disabled?: boolean
  required?: boolean
  name: string
  value?: string
  onChange: ChangeEventHandler<any> | undefined
  showStrengthBar?: boolean
  handleStrength?: (score: any, feedback: any) => void
} & InputHTMLAttributes<HTMLInputElement>

export const PasswordField = React.forwardRef(function PasswordField(
  {
    label,
    name,
    initialValue = '',
    onChange,
    value,
    error,
    disabled,
    required,
    showStrengthBar = false,
    handleStrength,
    ...props
  }: PasswordFieldProps,
  ref?: ForwardedRef<HTMLInputElement>
) {
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
        required={required}
        type={toggleType}
        ref={ref}
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
            (key, valueScore) => ScoreWordsEnum[valueScore]
          )}
          shortScoreWord="muito curta"
          onChangeScore={handleStrength || undefined}
        />
      )}
    </>
  )
})

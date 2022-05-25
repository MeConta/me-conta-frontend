import React, {
  ChangeEventHandler,
  ForwardedRef,
  InputHTMLAttributes,
  useState
} from 'react'
import PasswordStrengthBar, {
  PasswordFeedback
} from 'react-password-strength-bar'

import { EyeFill, EyeSlashFill } from '@styled-icons/bootstrap'
import { TextField } from '../TextField'

import * as S from './styles'
import Popover, { PopoverProps } from '../Popover'

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
  handleStrength?: (score: number, feedback: PasswordFeedback) => void
  showPopover?: boolean
  popoverProps?: PopoverProps
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
    showPopover,
    popoverProps,
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
        data-testid="passwordField"
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
        showPopover={showPopover}
        popover={
          <Popover
            title={popoverProps?.title ?? 'A senha deve conter pelo menos:'}
            items={
              popoverProps?.items ?? [
                '8-20 caracteres',
                '1 número',
                '1 letra maiúscula',
                '1 letra minúscula',
                '1 caracter especial (ex: !, @, #, $)'
              ]
            }
          ></Popover>
        }
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

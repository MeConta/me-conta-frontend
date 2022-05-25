import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'components/atoms/Button'
import { PasswordField, ScoreWordsEnum } from 'components/atoms/PasswordField'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { IAuthService } from 'services/auth-services/auth-service'
import * as Yup from 'yup'
import { BackendError } from '../../../types/backend-error'
import * as S from './styles'

type MyFormValues = {
  password: string
  passwordConfirm: string
}

type MyProps = {
  hash: string
  authService: IAuthService
  handleSuccess: () => void
  handleError: (error: BackendError) => void
}

const ERRORS = {
  REQUIRED_PASSWORD: `A senha é obrigatória`,
  WEAK_PASSWORD: `A senha deve ser forte`,
  REQUIRED_CONFIRM_PASSWORD: 'A confirmação de senha é obrigatória',
  PASSWORD_MISMATCH: `As senhas devem ser iguais`
}

export function FormResetSenha(props: MyProps) {
  const [passwordScore, setPasswordScore] = useState(ScoreWordsEnum.fraca)

  const validationSchema = Yup.object({
    password: Yup.string()
      .required(ERRORS.REQUIRED_PASSWORD)
      .test('make-a-strong-password-test', ERRORS.WEAK_PASSWORD, () => {
        return passwordScore > ScoreWordsEnum.razoavel
      }),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], ERRORS.PASSWORD_MISMATCH)
      .required(ERRORS.REQUIRED_CONFIRM_PASSWORD)
  })

  const onSubmit = async ({ password }: MyFormValues) => {
    try {
      if (props.authService.resetarSenha && props.hash) {
        await props.authService.resetarSenha({
          senha: password,
          hash: props.hash
        })
        props.handleSuccess()
      }
    } catch (e) {
      props.handleError(e)
    }
  }

  const initialValues: MyFormValues = {
    password: '',
    passwordConfirm: ''
  }

  const {
    control,
    formState: { errors, isSubmitting, isSubmitted, isValid },
    handleSubmit
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues
  })

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <PasswordField
            label="Nova senha"
            required={true}
            showStrengthBar
            handleStrength={(score) => {
              setPasswordScore(score)
            }}
            error={errors.password?.message}
            showPopover
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="passwordConfirm"
        render={({ field }) => (
          <PasswordField
            required={true}
            label="Confirmar nova senha"
            error={errors.passwordConfirm?.message}
            {...field}
          />
        )}
      />
      <S.ButtonContainer>
        <Button
          radius="square"
          disabled={isSubmitting || (isSubmitted && !isValid)}
          type="submit"
          size="mediumLarge"
        >
          REDEFINIR MINHA SENHA
        </Button>
      </S.ButtonContainer>
    </S.Form>
  )
}

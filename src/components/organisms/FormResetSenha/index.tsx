import { Button } from 'components/atoms/Button'
import { PasswordField, ScoreWordsEnum } from 'components/atoms/PasswordField'
import { Formik } from 'formik'
import React, { useState } from 'react'
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
  REQUIRED_PASSWORD: `A senha é obrigatório`,
  WEAK_PASSWORD: `A senha deve ser forte`,
  REQUIRED_CONFIRM_PASSWORD: 'A confirmação de senha é obrigatório',
  PASSWORD_MISMATCH: `As senhas devem ser iguais`
}

export function FormResetSenha(props: MyProps) {
  const [passwordScore, setPasswordScore] = useState(ScoreWordsEnum.fraca)

  const validation = Yup.object({
    password: Yup.string()
      .required(ERRORS.REQUIRED_PASSWORD)
      .test('make-a-strong-password-test', ERRORS.WEAK_PASSWORD, () => {
        return passwordScore > ScoreWordsEnum.razoavel
      }),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], ERRORS.PASSWORD_MISMATCH)
      .required(ERRORS.REQUIRED_CONFIRM_PASSWORD)
  })

  const formSubmit = async ({ password }: MyFormValues) => {
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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={formSubmit}
      validationSchema={validation}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        isValid
      }) => (
        <S.Form onSubmit={handleSubmit}>
          <PasswordField
            label="Senha"
            name="password"
            showStrengthBar
            handleStrength={(score) => {
              setPasswordScore(score)
            }}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={errors.password}
          />
          <PasswordField
            label="Confirmar Senha"
            name="passwordConfirm"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.passwordConfirm}
            error={errors.passwordConfirm}
          />
          <S.ButtonContainer>
            <Button
              radius="square"
              disabled={isSubmitting || !isValid}
              type="submit"
            >
              ENVIAR
            </Button>
          </S.ButtonContainer>
        </S.Form>
      )}
    </Formik>
  )
}

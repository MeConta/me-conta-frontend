import { Button } from 'components/atoms/Button'
import { TextField } from 'components/atoms/TextField'
import { Formik } from 'formik'
import React from 'react'
import { IAuthService } from 'services/auth-services/auth-service'
import * as Yup from 'yup'
import { BackendError } from '../../../types/backend-error'
import * as S from './styles'

type MyFormValues = {
  email: string
}

const ERRORS = {
  INVALID_EMAIL: `E-mail inválido`,
  REQUIRED_EMAIL: `E-mail é obrigatório`
}

export function FormRecuperacaoSenha(props: {
  authService: IAuthService
  handleSuccess: () => void
  handleError: (error: BackendError) => void
}) {
  const validation = Yup.object({
    email: Yup.string()
      .email(ERRORS.INVALID_EMAIL)
      .required(ERRORS.REQUIRED_EMAIL)
  })

  const formSubmit = async ({ email }: MyFormValues) => {
    try {
      if (props.authService.recuperarSenha) {
        await props.authService.recuperarSenha(email)
        props.handleSuccess()
      }
    } catch (e) {
      props.handleError(e)
    }
  }

  const initialValues: MyFormValues = {
    email: ''
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
          <TextField
            label="E-mail"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={errors.email}
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

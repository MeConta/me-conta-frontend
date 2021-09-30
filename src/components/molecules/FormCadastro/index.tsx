import { TextField } from 'components/atoms/TextField'
import { Button } from 'components/atoms/Button'
import { PasswordField, ScoreWordsEnum } from 'components/atoms/PasswordField'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { RadioField } from 'components/atoms/RadioField'
import * as Yup from 'yup'
import {
  ISignupService,
  SignupUser
} from '../../../services/signup-service/signup-service'
import { BackendError } from '../../../types/backend-error'
import { UserType } from '../../../enums/user-type.enum'

type MyFormValues = {
  name: string
  email: string
  password: string
  passwordConfirm: string
  tipo: UserType
}

const ERRORS = {
  REQUIRED_NAME: `Nome é obrigatório`,
  INVALID_EMAIL: `E-mail inválido`,
  REQUIRED_EMAIL: `E-mails is required`,
  REQUIRED_PASSWORD: `A senha é necessária`,
  WEAK_PASSWORD: `A senha deve ser forte`,
  PASSWORD_MISMATCH: `As senhas devem ser iguais`,
  REQUIRED_TYPE: `Tipo is Required`
}

export const TYPES = {
  ALUNO: 'Aluno',
  SUPERVISOR: 'Voluntário Supervisor',
  ATENDENTE: 'Voluntário Atendente'
}

export function FormCadastro(props: {
  signupService: ISignupService
  handleSuccess: (form: SignupUser) => void
  handleError: (error: BackendError) => void
}) {
  const [passwordScore, setPasswordScore] = useState(ScoreWordsEnum.fraca)

  const validation = Yup.object({
    name: Yup.string().required(ERRORS.REQUIRED_NAME),
    email: Yup.string()
      .email(ERRORS.INVALID_EMAIL)
      .required(ERRORS.REQUIRED_EMAIL),
    password: Yup.string()
      .required(ERRORS.REQUIRED_PASSWORD)
      .test('make-a-strong-password-test', ERRORS.WEAK_PASSWORD, () => {
        return passwordScore > ScoreWordsEnum.razoavel
      }),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], ERRORS.PASSWORD_MISMATCH)
      .required('Confirmation not valid'),
    tipo: Yup.mixed().oneOf(
      [UserType.ALUNO, UserType.ATENDENTE, UserType.SUPERVISOR],
      ERRORS.REQUIRED_TYPE
    )
  })

  const formSubmit = async ({ name, email, password, tipo }: MyFormValues) => {
    try {
      await props.signupService.initialSignup({
        nome: name,
        email,
        senha: password,
        tipo
      })
      props.handleSuccess({ nome: name, email, senha: password, tipo })
    } catch (e) {
      props.handleError(e)
    }
  }

  const initialValues: MyFormValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
    tipo: UserType.ALUNO
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
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nome"
            name="name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            error={errors.name}
          />
          <TextField
            label="E-mail"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            error={errors.email}
          />
          <PasswordField
            label="Password"
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
            label="Confirmar Password"
            name="passwordConfirm"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.passwordConfirm}
            error={errors.passwordConfirm}
          />
          <RadioField
            options={Object.values(TYPES)}
            name="tipo"
            label="Tipo"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.tipo}
            error={errors.tipo}
          />
          <Button
            radius="square"
            disabled={isSubmitting || !isValid}
            type="submit"
          >
            CADASTRAR
          </Button>
        </form>
      )}
    </Formik>
  )
}

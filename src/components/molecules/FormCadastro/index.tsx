import { Button } from 'components/atoms/Button'
import { CheckboxField } from 'components/atoms/CheckboxField'
import { PasswordField, ScoreWordsEnum } from 'components/atoms/PasswordField'
import { RadioField } from 'components/atoms/RadioField'
import { TextField } from 'components/atoms/TextField'
import { Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { UserType } from '../../../enums/user-type.enum'
import {
  ISignupService,
  SignupUser
} from '../../../services/signup-service/signup-service'
import { BackendError } from '../../../types/backend-error'

type MyFormValues = {
  name: string
  email: string
  password: string
  passwordConfirm: string
  tipo: number
  termsConfirm: boolean
}

const ERRORS = {
  REQUIRED_NAME: `Nome é obrigatório`,
  INVALID_EMAIL: `E-mail inválido`,
  MIN_LENGHT_NAME: `Nome deve conter mais de 2 caracteres`,
  REQUIRED_EMAIL: `E-mail é obrigatório`,
  REQUIRED_PASSWORD: `A senha é obrigatório`,
  WEAK_PASSWORD: `A senha deve ser forte`,
  PASSWORD_MISMATCH: `As senhas devem ser iguais`,
  REQUIRED_TYPE: `Tipo é obrigatório`,
  REQUIRED_TERM: `Termo obrigatório`
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
    name: Yup.string()
      .required(ERRORS.REQUIRED_NAME)
      .min(2, ERRORS.MIN_LENGHT_NAME),
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
    tipo: Yup.number().oneOf(
      [UserType.ALUNO, UserType.ATENDENTE, UserType.SUPERVISOR],
      ERRORS.REQUIRED_TYPE
    ),
    termsConfirm: Yup.boolean().required().oneOf([true], ERRORS.REQUIRED_TERM)
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
    tipo: UserType.ALUNO,
    termsConfirm: false
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
            options={Object.values(TYPES).map((type, index) => {
              return { label: type, value: index }
            })}
            name="tipo"
            label="Tipo"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.tipo}
            error={errors.tipo}
          />
          <CheckboxField
            label={
              <span>
                Eu li e concordo com os{' '}
                <a href="/static/termosDeUso.pdf" target="_blank">
                  Termos de uso
                </a>{' '}
                e{' '}
                <a href="/static/politicaPrivacidade.pdf">
                  Políticas de Privacidade
                </a>
              </span>
            }
            name="termsConfirm"
            onChange={handleChange}
            onBlur={handleBlur}
            checked={values.termsConfirm}
            error={errors.termsConfirm}
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

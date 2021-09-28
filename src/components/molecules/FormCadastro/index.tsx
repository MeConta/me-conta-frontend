import { TextField } from 'components/atoms/TextField'
import { Button } from 'components/atoms/Button'
import { PasswordField, ScoreWordsEnum } from 'components/atoms/PasswordField'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { RadioField } from 'components/atoms/RadioField'
import * as Yup from 'yup'
import { ISignupService } from '../../../services/signup-service/signup-service'

type MyFormValues = {
  email: string
  password: string
  passwordConfirm: string
  tipo: string
}

export const ERRORS = {
  INVALID_EMAIL: `E-mail inválido`,
  REQUIRED_EMAIL: `E-mails is required`,
  REQUIRED_PASSWORD: `A senha é necessária`,
  WEAK_PASSWORD: `A senha deve ser forte`,
  PASSWORD_MISMATCH: `As senhas devem ser iguais`
}

export const TYPES = {
  ALUNO: 'Aluno',
  SUPERVISOR: 'Voluntário Supervisor',
  ATENDENTE: 'Voluntário Atendente'
}

export function FormCadastro(props: { signupService: ISignupService }) {
  const [passwordScore, setPasswordScore] = useState(ScoreWordsEnum.fraca)

  const validation = Yup.object({
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
    tipo: Yup.string().required('Tipo is Required')
  })

  const formSubmit = async ({ email, password, tipo }: MyFormValues) => {
    props.signupService.initialSignup({ email, password, tipo })
  }

  const initialValues: MyFormValues = {
    email: '',
    password: '',
    passwordConfirm: '',
    tipo: ''
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

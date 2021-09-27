import { TextField } from 'components/atoms/TextField'
import { Button } from 'components/atoms/Button'
import { PasswordField } from 'components/atoms/PasswordField'
import { Formik } from 'formik'
import React from 'react'
import { RadioField } from 'components/atoms/RadioField'
import * as Yup from 'yup'

type MyFormValues = {
  email: string
  password: string
  passwordConfirm: string
  tipo: string
}

const validation = Yup.object({
  email: Yup.string().email('Must be e-mail').required('E-mails is required'),
  password: Yup.string().required('password required'),
  passwordConfirm: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirmation not valid'),
  tipo: Yup.string().required('Tipo is Required')
})
export function FormCadastro() {
  const formSubmit = async ({
    email,
    password,
    passwordConfirm,
    tipo
  }: MyFormValues) => {
    console.log('Luiz é um cara legal!')
    return true
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
            options={['Aluno', 'Voluntário']}
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

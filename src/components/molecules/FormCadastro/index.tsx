import { TextField } from 'components/atoms/TextField'
import { Button } from 'components/atoms/Button'
import { PasswordField } from 'components/atoms/PasswordField'
import { Formik } from 'formik'
import React from 'react'
import { RadioField } from 'components/atoms/RadioField'

type MyFormValues = {
  email: string
  password: string
  tipo: string
}

export function FormCadastro() {
  const formSubmit = async ({ email, password, tipo }: MyFormValues) => {
    return true
  }

  const initialValues: MyFormValues = { email: '', password: '', tipo: '' }

  return (
    <Formik initialValues={initialValues} onSubmit={formSubmit}>
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
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
          <RadioField
            options={['Aluno', 'Voluntário']}
            name="tipo"
            label="Tipo"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.tipo}
            error={errors.tipo}
          />

          <Button radius="square" disabled={isSubmitting} type="submit">
            CADASTRAR
          </Button>
        </form>
      )}
    </Formik>
  )
}

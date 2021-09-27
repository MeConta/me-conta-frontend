import Link from 'next/link'
import { Formik } from 'formik'
import * as Yup from 'yup'

import { Button } from 'components/atoms/Button'
import { PasswordField } from 'components/atoms/PasswordField'
import { TextField } from 'components/atoms/TextField'
import { AuthService } from '../../../services/auth-services/auth-service'

type MyFormValues = {
  email: string
  password: string
}

export const FormLogin = (props: { authService: AuthService }) => {
  const formSubmit = async ({ email, password }: MyFormValues) => {
    await props.authService.login({ email, senha: password })
    // chamada da api(email, password)
  }

  const SigninSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string()
      .min(8, 'Deve ter minimo de 8 caracteres')
      .required('Required')
  })

  const initialValues: MyFormValues = { email: '', password: '' }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={formSubmit}
      validationSchema={SigninSchema}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting
      }) => (
        <form onSubmit={handleSubmit}>
          <h2>Faça seu login e comece seu atendimento!</h2>

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
          <Link href="/forgot-password">
            <a>Esqueceu a senha?</a>
          </Link>
          <Button radius="square" disabled={isSubmitting} type="submit">
            ENTRAR
          </Button>
          <p>Quer fazer parte do Me Conta?</p>
        </form>
      )}
    </Formik>
  )
}

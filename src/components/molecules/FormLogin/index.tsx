import { Button } from 'components/atoms/Button'
import { PasswordField } from 'components/atoms/PasswordField'
import { TextField } from 'components/atoms/TextField'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { IAuthService } from '../../../services/auth-services/auth-service'

import * as S from './styles'

type MyFormValues = {
  email: string
  password: string
}

export const FormLogin = (props: { authService: IAuthService }) => {
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
          <PasswordField
            label="Senha"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            error={errors.password}
          />
          <S.ButtonContainer>
            <Button
              radius="square"
              disabled={isSubmitting || !isValid}
              type="submit"
            >
              ENTRAR
            </Button>
          </S.ButtonContainer>
        </S.Form>
      )}
    </Formik>
  )
}

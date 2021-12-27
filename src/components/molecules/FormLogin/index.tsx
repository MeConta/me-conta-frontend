import { Button } from 'components/atoms/Button'
import { PasswordField } from 'components/atoms/PasswordField'
import { TextField } from 'components/atoms/TextField'
import { UserType } from 'enums/user-type.enum'
import { Formik } from 'formik'
import { useLocalStorage } from 'hooks/localstorage.hook'
import router from 'next/router'
import { BackendError } from 'types/backend-error'
import * as Yup from 'yup'
import { IAuthService } from '../../../services/auth-services/auth-service'

import * as S from './styles'

type FormLoginValues = {
  email: string
  password: string
}

type FormLoginProps = {
  authService: IAuthService
  handleError: (error: BackendError) => void
}

const ERRORS = {
  INVALID_EMAIL: `E-mail inválido`,
  REQUIRED_EMAIL: `E-mail é obrigatório`,
  REQUIRED_PASSWORD: `A senha é obrigatório`
}

export const FormLogin = ({ authService, handleError }: FormLoginProps) => {
  const [, setToken] = useLocalStorage<string>('token', '')
  const [, setTipo] = useLocalStorage<string>('tipo', '')

  const formSubmit = async ({ email, password }: FormLoginValues) => {
    try {
      const { token, tipo } = await authService.login({
        email,
        senha: password
      })
      setToken(token)
      setTipo(tipo.toString())

      if (tipo === UserType.ALUNO) {
        router.push('/dashboard-aluno')
      } else if (tipo === UserType.ATENDENTE) {
        router.push('/dashboard-atendente')
      } else if (tipo === UserType.SUPERVISOR) {
        router.push('/dashboard-surpervisor')
      }
    } catch (error) {
      handleError(error)
    }
  }

  const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .email(ERRORS.INVALID_EMAIL)
      .required(ERRORS.REQUIRED_EMAIL),
    password: Yup.string().required(ERRORS.REQUIRED_PASSWORD)
  })

  const initialValues: FormLoginValues = { email: '', password: '' }

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

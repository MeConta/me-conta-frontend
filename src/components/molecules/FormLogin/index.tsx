import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'components/atoms/Button'
import { PasswordField } from 'components/atoms/PasswordField'
import { TextField } from 'components/atoms/TextField'
import router from 'next/router'
import { useForm } from 'react-hook-form'
import { useAuthContext } from 'store/auth-context'
import { BackendError } from 'types/backend-error'
import { redirects } from 'utils/routes/redirects'
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
  const authCtx = useAuthContext()

  const onSubmit = async ({ email, password }: FormLoginValues) => {
    try {
      const { token, tipo, nome, refreshToken } = await authService.login({
        email,
        senha: password
      })

      authCtx.handleLogin({
        nome,
        tipo: tipo.toString(),
        token,
        refreshToken
      })

      const redirect = redirects[tipo]

      if (redirect) {
        await router.push(redirect)
      }
    } catch (error) {
      handleError(error as BackendError)
    }
  }

  const SigninSchema = Yup.object().shape({
    email: Yup.string()
      .email(ERRORS.INVALID_EMAIL)
      .required(ERRORS.REQUIRED_EMAIL),
    password: Yup.string().required(ERRORS.REQUIRED_PASSWORD)
  })

  const initialValues: FormLoginValues = { email: '', password: '' }

  const {
    register,
    formState: { errors, isSubmitting, isValid },
    handleSubmit
  } = useForm({
    resolver: yupResolver(SigninSchema),
    defaultValues: initialValues,
    mode: 'onChange'
  })

  const buttonDisabled: boolean = isSubmitting || !isValid

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="E-mail"
        error={errors.email?.message}
        {...register('email')}
      />
      <PasswordField
        label="Senha"
        error={errors.password?.message}
        {...register('password')}
      />
      <S.ButtonContainer>
        <Button radius="square" disabled={buttonDisabled} type="submit">
          ENTRAR
        </Button>
      </S.ButtonContainer>
    </S.Form>
  )
}

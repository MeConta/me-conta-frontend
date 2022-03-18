import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'components/atoms/Button'
import { PasswordField } from 'components/atoms/PasswordField'
import { TextField } from 'components/atoms/TextField'
import { UserType } from 'enums/user-type.enum'
import { useLocalStorage } from 'hooks/localstorage.hook'
import router from 'next/router'
import { Controller, useForm } from 'react-hook-form'
import { BackendError } from 'types/backend-error'
import * as Yup from 'yup'
import {
  IAuthService,
  useAuthService
} from '../../../services/auth-services/auth-service'

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

const redirects = {
  [UserType.ALUNO]: '/dashboard-aluno',
  [UserType.ATENDENTE]: '/dashboard-atendente',
  [UserType.SUPERVISOR]: '/dashboard-supervisor',
  [UserType.ADMINISTRADOR]: '/dashboard-administrador'
}

export const FormLogin = ({ authService, handleError }: FormLoginProps) => {
  const authCtx = useAuthService()

  const onSubmit = async ({ email, password }: FormLoginValues) => {
    try {
      const { token, tipo, nome } = await authService.login({
        email,
        senha: password
      })

      authCtx.storeSessionData({
        nome,
        tipo: tipo.toString(),
        token
      })

      const redirect = redirects[tipo]

      if (redirect) {
        router.push(redirect)
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
    formState: { errors, isSubmitting, isSubmitted, isValid },
    handleSubmit,
    control
  } = useForm({
    resolver: yupResolver(SigninSchema),
    defaultValues: initialValues
  })

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="E-mail"
        error={errors.email?.message}
        {...register('email')}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <PasswordField
            label="Senha"
            error={errors.password?.message}
            {...field}
          />
        )}
      />
      <S.ButtonContainer>
        <Button
          radius="square"
          disabled={isSubmitting || (isSubmitted && !isValid)}
          type="submit"
        >
          ENTRAR
        </Button>
      </S.ButtonContainer>
    </S.Form>
  )
}

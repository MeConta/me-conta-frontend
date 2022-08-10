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
import { api } from '../../../services/api/api'
import Link from 'next/link'

import * as S from './styles'
import * as F from '../../../styles/form/styles'
import { useState } from 'react'

type FormLoginValues = {
  email: string
  password: string
}

type FormLoginProps = {
  handleError: (error: BackendError) => void
}

const ERRORS = {
  INVALID_EMAIL: `E-mail inválido`,
  REQUIRED_EMAIL: `E-mail é obrigatório`,
  REQUIRED_PASSWORD: `A senha é obrigatório`
}

export const FormLogin = ({ handleError }: FormLoginProps) => {
  const { handleLogin } = useAuthContext()
  const [isLoading, setLoading] = useState(false)

  const handleDashboardRedirection = async (userType: string) => {
    const typeRedirectionIndex = parseInt(userType, 10)

    const redirect = redirects[typeRedirectionIndex]

    if (redirect) {
      await router.push(redirect)
    }
  }

  const onSubmit = async ({ email, password }: FormLoginValues) => {
    try {
      setLoading(true)
      const response = await api.post('/auth/login', {
        username: email,
        password: password
      })

      handleLogin({
        name: response.data.nome,
        type: response.data.tipo,
        token: response.data.token,
        refreshToken: response.data.refreshToken,
        completeProfile: response.data.perfilCompleto,
        permissaoNavegar: response.data.permissaoNavegar
      })

      if (response.data.perfilCompleto)
        await handleDashboardRedirection(response.data.tipo)
      else await router.push('/criar-conta')
    } catch (error) {
      setLoading(false)
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
    formState: { errors },
    handleSubmit
  } = useForm({
    resolver: yupResolver(SigninSchema),
    defaultValues: initialValues,
    mode: 'onChange'
  })

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="E-mail"
        error={errors.email?.message}
        required={true}
        {...register('email')}
      />
      <PasswordField
        label="Senha"
        error={errors.password?.message}
        required={true}
        {...register('password')}
      />
      <S.ButtonContainer>
        <Button
          radius="square"
          type="submit"
          color="primary"
          size="mediumLarge"
          isLoading={isLoading}
        >
          ENTRAR
        </Button>
      </S.ButtonContainer>
      <S.Link>
        <Link passHref href="/recuperacao-de-senha">
          <F.AnchorLink color="cornflowerBlue">Esqueceu a senha?</F.AnchorLink>
        </Link>
      </S.Link>
    </S.Form>
  )
}

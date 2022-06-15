import { yupResolver } from '@hookform/resolvers/yup'
import { Button } from 'components/atoms/Button'
import { TextField } from 'components/atoms/TextField'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { IAuthService } from 'services/auth-services/auth-service'
import * as Yup from 'yup'
import { BackendError } from '../../../types/backend-error'
import * as S from './styles'

type MyFormValues = {
  email: string
}

const ERRORS = {
  INVALID_EMAIL: `E-mail inválido`,
  REQUIRED_EMAIL: `E-mail é obrigatório`
}

export function FormRecuperacaoSenha(props: {
  authService: IAuthService
  handleSuccess: () => void
  handleError: (error: BackendError) => void
}) {
  const [backendError, setBackendError] = useState('')
  const [isLoading, setLoading] = useState(false)

  const validationSchema = Yup.object({
    email: Yup.string()
      .email(ERRORS.INVALID_EMAIL)
      .required(ERRORS.REQUIRED_EMAIL)
  })

  const onSubmit = async ({ email }: MyFormValues) => {
    try {
      setLoading(true)
      if (props.authService.recuperarSenha) {
        await props.authService.recuperarSenha(email)
        setBackendError('')
        props.handleSuccess()
      }
    } catch (e: any) {
      setLoading(false)
      if (e?.response?.data?.code === 404) {
        setBackendError(ERRORS.INVALID_EMAIL)
      }
      props.handleError(e?.response?.data as BackendError)
    }
  }

  const initialValues: MyFormValues = {
    email: ''
  }

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues
  })

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        required={true}
        label="E-mail"
        error={errors.email?.message || backendError}
        {...register('email')}
      />
      <S.ButtonContainer>
        <Button
          radius="square"
          type="submit"
          size="mediumLarge"
          isLoading={isLoading}
        >
          RECUPERAR MINHA SENHA
        </Button>
      </S.ButtonContainer>
    </S.Form>
  )
}

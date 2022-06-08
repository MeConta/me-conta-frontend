/* eslint-disable no-unused-vars */
import { Button } from 'components/atoms/Button'
import { CheckboxField } from 'components/atoms/CheckboxField'
import {
  PasswordField,
  passwordRequirements
} from 'components/atoms/PasswordField'
import { RadioField } from 'components/atoms/RadioField'
import { TextField } from 'components/atoms/TextField'
import React, { useState } from 'react'
import * as Yup from 'yup'
import { UserType } from '../../../enums/user-type.enum'
import {
  ISignupService,
  SignupUser
} from '../../../services/signup-service/signup-service'
import { BackendError } from '../../../types/backend-error'
import * as S from './styles'
import * as F from '../../../styles/form/styles'
import { useLocalStorage } from '../../../hooks/localstorage.hook'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAuthContext } from 'store/auth-context'

const MAX_LENGTH_NAME_VALUE = 100
const MIN_LENGTH_NAME_VALUE = 2

type MyFormValues = {
  name: string
  email: string
  password: string
  passwordConfirm: string
  tipo: number
  termsConfirm: boolean
}

const ERRORS = {
  REQUIRED_NAME: `Nome é obrigatório`,
  INVALID_EMAIL: `E-mail inválido`,
  DUPLICATED_EMAIL: `Uma conta com esse e-mail já existe. Tente fazer o login clicando no botão Entrar.`,
  MIN_LENGHT_NAME: `Nome deve conter mais de ${MIN_LENGTH_NAME_VALUE} caracteres`,
  MAX_LENGHT_NAME: `Nome deve conter menos de ${MAX_LENGTH_NAME_VALUE} caracteres`,
  REQUIRED_EMAIL: `E-mail é obrigatório`,
  REQUIRED_PASSWORD: `A senha é obrigatório`,
  WEAK_PASSWORD: `A senha deve atender aos requisitos mínimos`,
  REQUIRED_CONFIRM_PASSWORD: 'A confirmação de senha é obrigatório',
  PASSWORD_MISMATCH: `As senhas devem ser iguais`,
  REQUIRED_TYPE: `Tipo é obrigatório`,
  REQUIRED_TERM: `Termo obrigatório`
}

export const TYPES = {
  ALUNO: { label: 'Quero apoio e orientação psicológica (Aluno)', value: 0 },
  ATENDENTE: {
    label:
      'Quero oferecer apoio e orientação psicológica (Voluntário Atendente)',
    value: 2
  }
}

const initialValues: MyFormValues = {
  name: '',
  email: '',
  password: '',
  passwordConfirm: '',
  tipo: UserType.ALUNO,
  termsConfirm: false
}

export function FormCadastro(props: {
  signupService: ISignupService
  handleSuccess: (form: SignupUser) => void
  handleError: (error: BackendError) => void
  setTipoDeUsuario: (usuario: UserType) => void
}) {
  const authCtx = useAuthContext()
  const [isLoading, setLoading] = useState(false)
  const [, setNome] = useLocalStorage<string>('nome', '')
  const [, setEmail] = useLocalStorage<string>('email', '')
  const [backendError, setBackendError] = useState('')

  const validationSchema = Yup.object({
    name: Yup.string()
      .required(ERRORS.REQUIRED_NAME)
      .trim()
      .min(MIN_LENGTH_NAME_VALUE, ERRORS.MIN_LENGHT_NAME)
      .max(MAX_LENGTH_NAME_VALUE, ERRORS.MAX_LENGHT_NAME)
      .matches(
        new RegExp(/^((\w|[à-ú]){2,} (\w|[à-ú]|'){2,})/, 'si'),
        'Por favor, informe seu nome completo'
      ),
    email: Yup.string()
      .email(ERRORS.INVALID_EMAIL)
      .required(ERRORS.REQUIRED_EMAIL),
    password: Yup.string()
      .required(ERRORS.REQUIRED_PASSWORD)
      .test('make-a-strong-password-test', ERRORS.WEAK_PASSWORD, (value) => {
        return passwordRequirements.every((regex) => value?.match(regex))
      }),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref('password'), null], ERRORS.PASSWORD_MISMATCH)
      .required(ERRORS.REQUIRED_CONFIRM_PASSWORD),
    tipo: Yup.number().oneOf(
      [UserType.ALUNO, UserType.ATENDENTE, UserType.SUPERVISOR],
      ERRORS.REQUIRED_TYPE
    ),
    termsConfirm: Yup.boolean().required().oneOf([true], ERRORS.REQUIRED_TERM)
  })

  const {
    register,
    formState: { errors },
    handleSubmit,
    control
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues
  })

  const onSubmit = async ({ name, email, password, tipo }: MyFormValues) => {
    try {
      setLoading(true)
      const { token, refreshToken } = await props.signupService.initialSignup({
        nome: name,
        email,
        senha: password,
        tipo: Number(tipo)
      })
      setNome(name)
      setEmail(email)
      setBackendError('')

      authCtx.handleLogin({
        name: name,
        type: tipo.toString(),
        token,
        refreshToken,
        completeProfile: false
      })

      props.handleSuccess({ nome: name, email, senha: password, tipo })
    } catch (e: any) {
      const error = e?.response?.data as BackendError
      if (error?.code === 409) {
        setBackendError(ERRORS.DUPLICATED_EMAIL)
      }
      setLoading(false)
      props.handleError(error as BackendError)
    }
  }

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Nome Completo"
        maxLength={MAX_LENGTH_NAME_VALUE}
        error={errors.name?.message}
        required={true}
        {...register('name')}
      />
      <TextField
        label="E-mail"
        error={errors.email?.message || backendError}
        required={true}
        {...register('email')}
      />

      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <PasswordField
            label="Senha"
            showStrengthBar
            error={errors.password?.message}
            required={true}
            showPopover
            {...field}
          />
        )}
      />

      <Controller
        name="passwordConfirm"
        control={control}
        render={({ field }) => (
          <PasswordField
            label="Confirmar Senha"
            {...field}
            error={errors.passwordConfirm?.message}
            required={true}
          />
        )}
      />

      <Controller
        name="tipo"
        control={control}
        render={({ field }) => (
          <RadioField
            options={Object.values(TYPES).map((type) => {
              return { label: type.label, value: type.value }
            })}
            label="Tipo"
            error={errors.tipo?.message}
            required={true}
            {...field}
            onChange={(event) => {
              field.onChange(event)
              props.setTipoDeUsuario(+event.target.value)
            }}
          />
        )}
      />

      <CheckboxField
        label={
          <span>
            Eu li e concordo com os{' '}
            <F.AnchorLink
              color="mineShaft"
              href="/static/termosDeUso.pdf"
              target="_blank"
            >
              Termos de uso
            </F.AnchorLink>{' '}
            e{' '}
            <F.AnchorLink
              color="mineShaft"
              href="/static/politicaPrivacidade.pdf"
              target="_blank"
            >
              Políticas de Privacidade
            </F.AnchorLink>
          </span>
        }
        {...register('termsConfirm')}
        error={errors.termsConfirm?.message}
        required={true}
        margin="small"
      />

      <S.ButtonContainer>
        <Button
          radius="square"
          type="submit"
          size="mediumLarge"
          textTransform="uppercase"
          isLoading={isLoading}
        >
          Cadastrar
        </Button>
      </S.ButtonContainer>
    </S.Form>
  )
}

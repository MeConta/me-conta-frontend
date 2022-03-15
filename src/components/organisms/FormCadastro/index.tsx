import { Button } from 'components/atoms/Button'
import { CheckboxField } from 'components/atoms/CheckboxField'
import { PasswordField, ScoreWordsEnum } from 'components/atoms/PasswordField'
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
import { useLocalStorage } from '../../../hooks/localstorage.hook'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

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
  MIN_LENGHT_NAME: `Nome deve conter mais de ${MIN_LENGTH_NAME_VALUE} caracteres`,
  MAX_LENGHT_NAME: `Nome deve conter menos de ${MAX_LENGTH_NAME_VALUE} caracteres`,
  REQUIRED_EMAIL: `E-mail é obrigatório`,
  REQUIRED_PASSWORD: `A senha é obrigatório`,
  WEAK_PASSWORD: `A senha deve ser forte`,
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
  },
  SUPERVISOR: {
    label:
      'Quero supervisionar estudantes de psicologia (Voluntário Supervisor)',
    value: 1
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
}) {
  const [passwordScore, setPasswordScore] = useState(ScoreWordsEnum.fraca)
  const [, setToken] = useLocalStorage<string>('token', '')
  const [, setNome] = useLocalStorage<string>('nome', '')
  const [, setEmail] = useLocalStorage<string>('email', '')
  const [, setTipo] = useLocalStorage<UserType>('tipo', UserType.ALUNO)

  const validationSchema = Yup.object({
    name: Yup.string()
      .required(ERRORS.REQUIRED_NAME)
      .trim()
      .min(MIN_LENGTH_NAME_VALUE, ERRORS.MIN_LENGHT_NAME)
      .max(MAX_LENGTH_NAME_VALUE, ERRORS.MAX_LENGHT_NAME),
    email: Yup.string()
      .email(ERRORS.INVALID_EMAIL)
      .required(ERRORS.REQUIRED_EMAIL),
    password: Yup.string()
      .required(ERRORS.REQUIRED_PASSWORD)
      .test('make-a-strong-password-test', ERRORS.WEAK_PASSWORD, () => {
        return passwordScore > ScoreWordsEnum.razoavel
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
    formState: { errors, isSubmitting, isSubmitted, isValid },
    handleSubmit,
    control
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues
  })

  const onSubmit = async ({ name, email, password, tipo }: MyFormValues) => {
    try {
      const { token } = await props.signupService.initialSignup({
        nome: name,
        email,
        senha: password,
        tipo: Number(tipo)
      })
      setToken(token)
      setNome(name)
      setEmail(email)
      setTipo(tipo)
      props.handleSuccess({ nome: name, email, senha: password, tipo })
    } catch (e) {
      props.handleError(e)
    }
  }

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Nome"
        maxLength={MAX_LENGTH_NAME_VALUE}
        error={errors.name?.message}
        required={true}
        {...register('name')}
      />
      <TextField
        label="E-mail"
        error={errors.email?.message}
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
            handleStrength={(score) => {
              setPasswordScore(score)
            }}
            error={errors.password?.message}
            required={true}
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
          />
        )}
      />

      <CheckboxField
        label={
          <span>
            Eu li e concordo com os{' '}
            <a href="/static/termosDeUso.pdf" target="_blank">
              Termos de uso
            </a>{' '}
            e{' '}
            <a href="/static/politicaPrivacidade.pdf" target="_blank">
              Políticas de Privacidade
            </a>
          </span>
        }
        {...register('termsConfirm')}
        error={errors.termsConfirm?.message}
        required={true}
      />

      <S.ButtonContainer>
        <Button
          radius="square"
          disabled={isSubmitting || (isSubmitted && !isValid)}
          type="submit"
        >
          CADASTRAR
        </Button>
      </S.ButtonContainer>
    </S.Form>
  )
}

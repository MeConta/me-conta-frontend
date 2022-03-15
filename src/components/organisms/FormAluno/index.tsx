import * as Yup from 'yup'
import * as S from './styles'
import { TextField } from '../../atoms/TextField'
import { PhoneField } from '../../atoms/PhoneField'
import { SelectField } from '../../atoms/SelectField'
import { States } from './states'
import { Scholarity } from './scholarity'
import { RadioField } from '../../atoms/RadioField'
import { Button } from '../../atoms/Button'
import React from 'react'
import Link from 'next/link'
import moment from 'moment'
import { ISignupAlunoService } from '../../../services/signup-aluno-service/signup-aluno-service'
import { BackendError } from '../../../types/backend-error'
import { useLocalStorage } from '../../../hooks/localstorage.hook'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const MAX_LENGTH_NAME_VALUE = 100
const MIN_LENGTH_NAME_VALUE = 2
const LENGTH_PHONE_VALUE = 11

const MAX_LENGTH_CITY_VALUE = 100
const MIN_LENGTH_CITY_VALUE = 3

const MIN_LENGTH_PHONE_VALUE = 10

type MyFormValues = {
  telefone: string
  dataNascimento: string
  cidade: string
  UF: string
  genero: string
  tipoEscola: string
  escolaridade: string
  necessidades: string
  expectativas: string
  tratamentos: string
}

const ERRORS = {
  REQUIRED_NAME: `Nome completo é obrigatório.`,
  REQUIRED_PHONE: `Telefone é obrigatório.`,
  INVALID_PHONE: `Telefone inválido.`,
  MIN_LENGHT_NAME: `Nome deve conter mais de ${MIN_LENGTH_NAME_VALUE} caracteres.`,
  MAX_LENGHT_NAME: `Nome deve conter menos de ${MAX_LENGTH_NAME_VALUE} caracteres.`,
  LENGHT_PHONE: `Telefone deve conter ${LENGTH_PHONE_VALUE} dígitos.`,
  REQUIRED_DATA_NASCIMENTO: 'Data de nascimento é obrigatório.',
  BIRTHDATE: `Data de nascimento inválida.`,
  MIN_CITY_NAME: `Cidade deve conter mais de ${MIN_LENGTH_CITY_VALUE} caracteres.`,
  MAX_CITY_NAME: `Cidade deve conter menos de ${MAX_LENGTH_CITY_VALUE} caracteres.`,
  REQUIRED_CITY: `Cidade é obrigatório.`,
  REQUIRED_STATE: `Estado é obrigatório.`,
  REQUIRED_GENDER: `Gênero é obrigatório.`,
  REQUIRED_SCHOLARITY: `Escolaridade é obrigatória.`,
  REQUIRED_SCHOOL_TYPE: `Tipo de escola é obrigatório.`
}

const validationSchema = Yup.object({
  telefone: Yup.string()
    .trim()
    .required(ERRORS.REQUIRED_PHONE)
    .min(MIN_LENGTH_PHONE_VALUE, ERRORS.INVALID_PHONE),
  dataNascimento: Yup.date()
    .typeError(ERRORS.BIRTHDATE)
    .required(ERRORS.REQUIRED_DATA_NASCIMENTO)
    .max(moment().toDate(), ERRORS.BIRTHDATE)
    .min(moment().subtract(100, 'years').toDate(), ERRORS.BIRTHDATE),
  cidade: Yup.string()
    .required(ERRORS.REQUIRED_CITY)
    .trim()
    .min(MIN_LENGTH_CITY_VALUE, ERRORS.MIN_CITY_NAME)
    .max(MAX_LENGTH_CITY_VALUE, ERRORS.MAX_CITY_NAME),
  UF: Yup.string().required(ERRORS.REQUIRED_STATE),
  genero: Yup.string().required(ERRORS.REQUIRED_GENDER),
  escolaridade: Yup.string().required(ERRORS.REQUIRED_SCHOLARITY),
  tipoEscola: Yup.string().required(ERRORS.REQUIRED_SCHOOL_TYPE)
})

const GENDER = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Feminino' },
  { value: 'NB', label: 'Não Binário' },
  { value: 'ND', label: 'Prefiro não Declarar' }
]

const TIPOESCOLA = {
  PUBLICA: 'Escola Pública',
  PARTICULAR: 'Escola Particular'
}

const initialValues: MyFormValues = {
  telefone: '',
  dataNascimento: '',
  cidade: '',
  UF: '',
  genero: 'ND',
  escolaridade: '',
  tipoEscola: '0',
  necessidades: '',
  expectativas: '',
  tratamentos: ''
}

const FormAluno = (props: {
  alunoSignup: ISignupAlunoService
  handleSuccess: () => void
  handleError: (error: BackendError) => void
}) => {
  const [name] = useLocalStorage<string>('nome', '')
  const [token] = useLocalStorage<string>('token', '')
  const [email] = useLocalStorage<string>('email', '')

  const {
    register,
    formState: { errors, isSubmitting, isSubmitted, isValid },
    handleSubmit,
    control
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues
  })

  async function onSubmit(values: MyFormValues) {
    try {
      await props.alunoSignup.alunoSignup(
        {
          ...values,
          dataNascimento: moment(values.dataNascimento).format('YYYY-MM-DD'),
          tipoEscola: +values.tipoEscola,
          escolaridade: +values.escolaridade,
          necessidades: values.necessidades || null,
          expectativas: values.expectativas || null,
          tratamentos: values.tratamentos || null
        },
        token
      )
      props.handleSuccess()
    } catch (e) {
      props.handleError(e)
    }
  }

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        label="Nome Completo"
        name="name"
        disabled
        value={name}
        required={true}
      />
      <TextField
        label="E-mail"
        name="email"
        disabled
        value={email}
        required={true}
      />

      <Controller
        name="telefone"
        control={control}
        render={({ field }) => (
          <PhoneField
            data-testid="phone-number"
            label="Telefone"
            error={errors.telefone?.message}
            required={true}
            {...field}
          />
        )}
      />

      <TextField
        label="Data de nascimento"
        type="date"
        error={errors.dataNascimento?.message}
        max={moment().format('YYYY-MM-DD')}
        required={true}
        {...register('dataNascimento')}
      />
      <SelectField
        label="Estado"
        options={States}
        error={errors.UF?.message}
        required={true}
        {...register('UF')}
      />
      <TextField
        label="Cidade"
        error={errors.cidade?.message}
        required={true}
        {...register('cidade')}
      />

      <Controller
        name="genero"
        control={control}
        render={({ field }) => (
          <RadioField
            options={GENDER}
            label="Gênero"
            error={errors.genero?.message}
            required={true}
            {...field}
          />
        )}
      />

      <SelectField
        label="Escolaridade"
        options={Scholarity}
        error={errors.escolaridade?.message}
        required={true}
        {...register('escolaridade')}
      />

      <Controller
        name="tipoEscola"
        control={control}
        render={({ field }) => (
          <RadioField
            options={Object.values(TIPOESCOLA).map((type, index) => {
              return { label: type, value: index }
            })}
            label="Tipo de Escola"
            error={errors.tipoEscola?.message}
            {...field}
            required={true}
          />
        )}
      />

      <TextField
        label="Quais são suas necessidades no momento?"
        {...register('necessidades')}
      />

      <TextField
        label="O que você espera de nosso serviço?"
        {...register('expectativas')}
      />

      <TextField
        label="Você já fez algum tipo de tratamento psicológico?"
        {...register('tratamentos')}
      />

      <S.ButtonContainer>
        <Button
          radius="square"
          type="submit"
          color="primary"
          disabled={isSubmitting || (isSubmitted && !isValid)}
        >
          Concluir minha inscrição.
        </Button>
      </S.ButtonContainer>
      <S.Link>
        <Link href="/dashboard-aluno">
          <a>Preencher depois.</a>
        </Link>
      </S.Link>
    </S.Form>
  )
}

export default FormAluno

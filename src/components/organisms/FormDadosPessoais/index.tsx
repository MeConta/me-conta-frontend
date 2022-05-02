import * as Yup from 'yup'
import React from 'react'
import * as F from '../../../styles/form/styles'
import { Button } from '../../atoms/Button'
import { Controller, useForm } from 'react-hook-form'
import { PhoneField } from 'components/atoms/PhoneField'
import { TextField } from '../../atoms/TextField'
import { RadioField } from '../../atoms/RadioField'
import { SelectField } from '../../atoms/SelectField'
import { States } from '../FormAluno/states'
import moment from 'moment'
import { DadosPessoaisValues } from '../../../types/dados-cadastro'
import { yupResolver } from '@hookform/resolvers/yup'
import { PassosCadastro } from 'enums/passos-cadastro.enum'

export const MAX_LENGTH_NAME_VALUE = 100
export const MIN_LENGTH_NAME_VALUE = 2
export const LENGTH_PHONE_VALUE = 11

export const MAX_LENGTH_CITY_VALUE = 100
export const MIN_LENGTH_CITY_VALUE = 3

export const MIN_LENGTH_PHONE_VALUE = 10

export const ERRORS = {
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
export const GENDER = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Feminino' },
  { value: 'NB', label: 'Não Binário' },
  { value: 'ND', label: 'Prefiro não Declarar' }
]

export const TIPOESCOLA = {
  PUBLICA: 'Escola Pública',
  PARTICULAR: 'Escola Particular'
}

export const dadosPessoaisInitialValues: DadosPessoaisValues = {
  telefone: '',
  dataNascimento: '',
  cidade: '',
  UF: '',
  genero: 'ND'
}

type FormDadosPessoaisProps = {
  setDadosRegistro: React.Dispatch<React.SetStateAction<DadosPessoaisValues>>
  setNextStep: React.Dispatch<React.SetStateAction<number>>
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
  genero: Yup.string().required(ERRORS.REQUIRED_GENDER)
})

const FormDadosPessoais = ({
  setDadosRegistro,
  setNextStep
}: FormDadosPessoaisProps) => {
  const onSubmit = (values: DadosPessoaisValues) => {
    setDadosRegistro({
      ...values,
      dataNascimento: moment(values.dataNascimento).format('YYYY-MM-DD')
    })
    moveToNextStep()
  }
  const {
    control,
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: dadosPessoaisInitialValues
  })

  const moveToNextStep = () => {
    setNextStep(PassosCadastro.DADOS_ACADEMICOS)
  }

  return (
    <F.WrapperFields>
      <F.Form onSubmit={handleSubmit(onSubmit)} noValidate>
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
          labelField="Estado"
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
              display="two-columns"
              {...field}
            />
          )}
        />

        <F.ButtonContainer>
          <Button radius="square" type="submit" size="mediumLarge">
            PRÓXIMO PASSO
          </Button>
        </F.ButtonContainer>
      </F.Form>
    </F.WrapperFields>
  )
}

export default FormDadosPessoais

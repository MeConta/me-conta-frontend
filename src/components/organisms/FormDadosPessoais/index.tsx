import React from 'react'
import * as F from '../../../styles/form/styles'
import { Button } from '../../atoms/Button'
import { Controller, useForm } from 'react-hook-form'
import { PhoneField } from 'components/atoms/PhoneField'
import { TextField } from '../../atoms/TextField'
import { RadioField } from '../../atoms/RadioField'
import moment from 'moment'
import { SelectField } from '../../atoms/SelectField'
import { States } from './states'
import { DadosPessoaisValues } from '../../../types/dados-cadastro'
import { yupResolver } from '@hookform/resolvers/yup'
import { PassosCadastro } from 'enums/passos-cadastro.enum'
import { validationSchema } from './validation'
import { useBeforeUnload } from 'hooks/beforeunload.hook'
import { handleBeforeUnload } from 'utils/handlers/handleBeforeUnload'

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

type FormDadosPessoaisProps = {
  setDadosPessoais: React.Dispatch<React.SetStateAction<DadosPessoaisValues>>
  setNextStep: React.Dispatch<React.SetStateAction<number>>
  valoresIniciais: DadosPessoaisValues
}

const FormDadosPessoais = ({
  setDadosPessoais,
  setNextStep,
  valoresIniciais
}: FormDadosPessoaisProps) => {
  const onSubmit = (values: DadosPessoaisValues) => {
    setDadosPessoais({
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
    defaultValues: valoresIniciais
  })

  useBeforeUnload(handleBeforeUnload)

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

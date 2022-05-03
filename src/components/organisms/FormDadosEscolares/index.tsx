import * as Yup from 'yup'
import * as F from '../../../styles/form/styles'
import { TextField } from '../../atoms/TextField'
import { SelectField } from '../../atoms/SelectField'
import { Scholarity } from './scholarity'
import { RadioField } from '../../atoms/RadioField'
import { Button } from '../../atoms/Button'
import React from 'react'
import { ISignupAlunoService } from '../../../services/signup-aluno-service/signup-aluno-service'
import { BackendError } from '../../../types/backend-error'
import { useLocalStorage } from '../../../hooks/localstorage.hook'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  DadosEscolares,
  CadastroAlunoValues,
  DadosPessoaisValues
} from '../../../types/dados-cadastro'
import { PassosCadastro } from 'enums/passos-cadastro.enum'
import { ArrowLeft } from '@styled-icons/bootstrap'

const ERRORS = {
  REQUIRED_SCHOLARITY: `Escolaridade é obrigatória.`,
  REQUIRED_SCHOOL_TYPE: `Tipo de escola é obrigatório.`
}

const validationSchema = Yup.object({
  escolaridade: Yup.string().required(ERRORS.REQUIRED_SCHOLARITY),
  tipoEscola: Yup.string().required(ERRORS.REQUIRED_SCHOOL_TYPE)
})

const TIPOESCOLA = {
  PUBLICA: 'Escola Pública',
  PARTICULAR: 'Escola Particular'
}

const initialValues: DadosEscolares = {
  escolaridade: '',
  tipoEscola: '0',
  necessidades: '',
  expectativas: '',
  tratamentos: ''
}

type FormAlunoProps = {
  alunoSignup: ISignupAlunoService
  handleSuccess: () => void
  handleError: (error: BackendError) => void
  dadosPessoais: DadosPessoaisValues | null
  setPreviousStep: React.Dispatch<React.SetStateAction<PassosCadastro>>
}

const FormAluno = ({
  alunoSignup,
  handleSuccess,
  handleError,
  dadosPessoais,
  setPreviousStep
}: FormAlunoProps) => {
  const [token] = useLocalStorage<string>('token', '')

  const {
    register,
    formState: { errors, isSubmitting, isSubmitted, isValid },
    handleSubmit,
    control
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues
  })

  async function onSubmit(values: CadastroAlunoValues) {
    try {
      await alunoSignup.alunoSignup(
        {
          ...dadosPessoais,
          ...values,
          tipoEscola: +values.tipoEscola,
          escolaridade: +values.escolaridade,
          necessidades: values.necessidades || null,
          expectativas: values.expectativas || null,
          tratamentos: values.tratamentos || null
        },
        token
      )

      handleSuccess()
    } catch (e) {
      // @ts-ignore
      handleError(e)
    }
  }

  return (
    <F.WrapperFields>
      <F.Paragraph size="desk-xlarge" color="black">
        Complete seus <F.BoldParagraph>Dados Escolares</F.BoldParagraph>
      </F.Paragraph>

      <F.Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <SelectField
          labelField="Escolaridade"
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

        <F.ButtonContainer>
          <Button
            radius="square"
            type="submit"
            color="primary"
            disabled={isSubmitting || (isSubmitted && !isValid)}
            size="mediumLarge"
            textTransform="uppercase"
          >
            Concluir meu cadastro
          </Button>
        </F.ButtonContainer>
        <F.ButtonContainer>
          <Button
            onClick={() => setPreviousStep(PassosCadastro.DADOS_PESSOAIS)}
            btnStyle="link"
            prefixIcon={<ArrowLeft />}
          >
            Voltar
          </Button>
        </F.ButtonContainer>
      </F.Form>
    </F.WrapperFields>
  )
}

export default FormAluno

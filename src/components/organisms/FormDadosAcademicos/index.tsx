/* eslint-disable no-unused-vars */
import * as F from '../../../styles/form/styles'
import * as S from './styles'
import { TextField } from '../../atoms/TextField'
import { RadioField } from '../../atoms/RadioField'
import { ISignupVoluntarioService } from 'services/signup-voluntario-service/signup-voluntario-service'
import { BackendError } from '../../../types/backend-error'
import { useLocalStorage } from '../../../hooks/localstorage.hook'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import { TextAreaField } from 'components/atoms/TextAreaField'
import { Button } from 'components/atoms/Button'
import { ArrowLeft } from '@styled-icons/bootstrap'
import { PassosCadastro } from 'enums/passos-cadastro.enum'
import { SelectField } from 'components/atoms/SelectField'
import validationSchema from './validation'
import React, { useState } from 'react'
import { CheckboxGroup } from 'components/molecules/CheckboxGroup'
import ESituacaoCurso from './situacao-curso'
import { DadosAcademicosValues } from './values-type'
import { UserType } from 'enums/user-type.enum'
import { DadosPessoaisValues } from 'types/dados-cadastro'
import { AreaAtuacao } from './area-atuacao.enum'
import { useBeforeUnload } from 'hooks/beforeunload.hook'
import { handleBeforeUnload } from 'utils/handlers/handleBeforeUnload'

interface DadosAcademicosProp {
  setCurrentStep: React.Dispatch<React.SetStateAction<PassosCadastro>>
  signupVoluntarioService: ISignupVoluntarioService
  handleSuccess: () => void
  handleError: (err: BackendError) => void
  setPreviousValues: Function
  previousValues: DadosAcademicosValues | undefined
  dadosPessoais: DadosPessoaisValues | null
}

const NIVELFORMACAO = {
  SUPERIOR_COMPLETO: 'Superior Completo',
  SUPERIOR_ANDAMENTO: 'Superior em Andamento'
}

const FRENTEATUACAO = {
  SESSAO_ACOLHIMENTO: 'Sessões de acolhimento dos estudantes',
  COACHING: 'Coaching de rotina de estudos',
  VOCACIONAL: 'Orientação vocacional'
}

const values = {
  instituicao: '',
  anoFormacao: +moment().format('YYYY'),
  semestre: 1,
  nivelDeFormacao: ESituacaoCurso.ANDAMENTO,
  especializacoes: '',
  bio: '',
  crp: '',
  areaAtuacao: '',
  abordagem: '',
  frentes: []
}

export default function FormDadosAcademicos({
  setCurrentStep,
  signupVoluntarioService,
  handleSuccess,
  handleError,
  previousValues,
  setPreviousValues,
  dadosPessoais
}: DadosAcademicosProp) {
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
    setValue,
    control
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: previousValues ?? values
  })

  const [token] = useLocalStorage<string>('token', '')
  const [isLoading, setLoading] = useState(false)

  useBeforeUnload(handleBeforeUnload)

  const onSubmit = async (form: DadosAcademicosValues) => {
    const dadosVoluntario = possuiSuperiorCompleto()
      ? {
          areaAtuacao: form.areaAtuacao,
          especializacoes: form.especializacoes || null,
          crp: form.crp,
          abordagem: form.abordagem || null,
          anoFormacao: form.anoFormacao
        }
      : {
          semestre: form.semestre
        }

    try {
      setLoading(true)
      await signupVoluntarioService.voluntarioSignUp(
        {
          ...dadosPessoais!,
          ...dadosVoluntario,
          instituicao: form.instituicao,
          bio: form.bio,
          frentes: form.frentes,
          tipo: UserType.ATENDENTE,
          formado: possuiSuperiorCompleto()
        },
        token
      )

      handleSuccess()
    } catch (e) {
      setLoading(false)
      handleError(e as BackendError)
    }
  }

  const possuiSuperiorCompleto = () => {
    return watch('nivelDeFormacao') === ESituacaoCurso.COMPLETO
  }

  const renderizarSuperiorCompleto = () => {
    return (
      <S.SuperiorCompleto ativo={possuiSuperiorCompleto()}>
        <TextField
          label="CRP"
          {...register('crp')}
          required
          error={errors.crp?.message}
        />
        <TextAreaField
          label="Possui especialização? Se sim, qual(is)?"
          {...register('especializacoes')}
          error={errors.especializacoes?.message}
        />
        <SelectField
          labelField={'Área de Atuação'}
          options={[
            {
              value: AreaAtuacao.PROFESSOR,
              label: 'Professor(a) de psicologia'
            },
            { value: AreaAtuacao.PSICOLOGO, label: 'Psicólogo(a)' }
          ]}
          {...register('areaAtuacao')}
          required
          error={errors.areaAtuacao?.message}
        />
        <TextField
          label="Abordagem psicoterápica"
          {...register('abordagem')}
          error={errors.abordagem?.message}
        />
      </S.SuperiorCompleto>
    )
  }

  function handleGoingBack() {
    setPreviousValues({
      instituicao: watch('instituicao'),
      anoFormacao: watch('anoFormacao'),
      semestre: watch('semestre'),
      nivelDeFormacao: watch('nivelDeFormacao'),
      especializacoes: watch('especializacoes'),
      bio: watch('bio'),
      crp: watch('crp'),
      areaAtuacao: watch('areaAtuacao'),
      abordagem: watch('abordagem'),
      frentes: watch('frentes')
    })
    setCurrentStep(PassosCadastro.DADOS_PESSOAIS)
  }

  return (
    <F.WrapperFields>
      <F.Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Controller
          name="nivelDeFormacao"
          control={control}
          render={({ field }) => (
            <RadioField
              options={Object.values(NIVELFORMACAO).map((type, index) => {
                return { label: type, value: index }
              })}
              label="Nível de Formação"
              {...field}
              required
              onChange={(e) => {
                field.onChange(e)
                e.target.value === '0'
                  ? setValue('anoFormacao', +moment().format('YYYY'))
                  : setValue('semestre', 1)
              }}
              error={errors.nivelDeFormacao?.message}
            />
          )}
        />
        <S.TextSplit
          errorActive={
            !!errors.instituicao?.message ||
            !!errors[possuiSuperiorCompleto() ? 'anoFormacao' : 'semestre']
              ?.message
          }
        >
          <TextField
            label="Instituição de Ensino"
            {...register('instituicao')}
            required
            error={errors.instituicao?.message}
          />
          <TextField
            type="number"
            required
            label={possuiSuperiorCompleto() ? 'Ano de conclusão' : 'Semestre'}
            {...register(possuiSuperiorCompleto() ? 'anoFormacao' : 'semestre')}
            error={
              possuiSuperiorCompleto()
                ? errors.anoFormacao?.message
                : errors.semestre?.message
            }
            min={1}
            max={possuiSuperiorCompleto() ? +moment().format('YYYY') : 10}
          />
        </S.TextSplit>
        {renderizarSuperiorCompleto()}
        <Controller
          name="frentes"
          control={control}
          render={({ field }) => (
            <CheckboxGroup
              label="Selecione em quais frentes você gostaria de atuar"
              subtitle="(pode selecionar mais de uma opção)"
              options={Object.values(FRENTEATUACAO).map((type, index) => {
                return { label: type, value: index }
              })}
              {...field}
              required
              error={(errors.frentes as any)?.message}
            />
          )}
        />
        <TextAreaField
          label="Breve descrição sobre você"
          {...register('bio')}
          value={watch('bio')}
          maxLength={255}
          showCharCounter
          required
          error={errors.bio?.message}
        />
        <F.ButtonContainer>
          <Button
            radius="square"
            type="submit"
            color="primary"
            size="mediumLarge"
            textTransform="uppercase"
            isLoading={isLoading}
          >
            Finalizar cadastro
          </Button>
        </F.ButtonContainer>
        <F.ButtonContainer>
          <Button
            onClick={handleGoingBack}
            btnStyle="link"
            prefixIcon={<ArrowLeft />}
          >
            Voltar
          </Button>
        </F.ButtonContainer>
        <F.Footer>
          <p>
            <strong>** Atendente: </strong>
            Nossos atendentes são quem prestarão os serviços aos alunos do
            Ensino Médio. Para entrar para essa rede, você deverá ser
            universitário de Psicologia ou psicólogo formado.
          </p>
        </F.Footer>
      </F.Form>
    </F.WrapperFields>
  )
}

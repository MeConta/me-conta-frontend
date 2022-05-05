import * as F from '../../../styles/form/styles'
import * as Yup from 'yup'
import * as S from './styles'
import { TextField } from '../../atoms/TextField'
import { RadioField } from '../../atoms/RadioField'
import {
  ISignupVoluntarioService,
  VoluntarioSignupUser
} from 'services/signup-voluntario-service/signup-voluntario-service'
import { BackendError } from '../../../types/backend-error'
import { useLocalStorage } from '../../../hooks/localstorage.hook'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import moment from 'moment'
import { CheckboxField } from 'components/atoms/CheckboxField'
import { TextAreaField } from 'components/atoms/TextAreaField'
import { Button } from 'components/atoms/Button'
import { ArrowLeft } from '@styled-icons/bootstrap'
import { PassosCadastro } from 'enums/passos-cadastro.enum'
import { Select } from 'components/atoms/SelectField/styles'
import { SelectField } from 'components/atoms/SelectField'
import validationSchema from './validation'
import { useEffect } from 'react'
import React from 'react'
import { CheckboxGroup } from 'components/molecules/CheckboxGroup'
import ESituacaoCurso from './situacao-curso'

interface DadosAcademicosProp {
  setPreviousStep: React.Dispatch<React.SetStateAction<PassosCadastro>>
  signupVoluntarioService: ISignupVoluntarioService
  handleSuccess: () => void
  handleError: (err: BackendError) => void
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
  frenteAtuacao: []
}

export default function FormDadosAcademicos({
  setPreviousStep,
  signupVoluntarioService,
  handleSuccess,
  handleError
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
    defaultValues: values
  })

  const [token] = useLocalStorage<string>('token', '')

  const onSubmit = async (form: VoluntarioSignupUser) => {
    try {
      await signupVoluntarioService.voluntarioSignUp(
        {
          ...form,
          formado: watch('nivelDeFormacao') === ESituacaoCurso.COMPLETO,
          areaAtuacao: form.areaAtuacao || null,
          especializacoes: form.especializacoes || null,
          crp: form.crp || null,
          abordagem: form.abordagem || null
        },
        token
      )
      handleSuccess()
    } catch (e) {
      handleError(e as BackendError)
    }
  }

  const renderizarSuperiorCompleto = () => {
    return (
      <S.SuperiorCompleto
        ativo={watch('nivelDeFormacao') === ESituacaoCurso.COMPLETO}
      >
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
            { value: 0, label: 'Professor(a) de psicologia' },
            { value: 1, label: 'Psicólogo(a)' }
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

  return (
    <F.WrapperFields>
      <F.Form onSubmit={handleSubmit(onSubmit)} noValidate>
        <S.TextSplit>
          <TextField
            label="Instituição de Ensino"
            {...register('instituicao')}
            required
            error={errors.instituicao?.message}
          />
          <TextField
            type="number"
            label={
              watch('nivelDeFormacao') === ESituacaoCurso.COMPLETO
                ? 'Ano de conclusão'
                : 'Semestre'
            }
            {...register(
              watch('nivelDeFormacao') === ESituacaoCurso.COMPLETO
                ? 'anoFormacao'
                : 'semestre'
            )}
            error={
              watch('nivelDeFormacao') === ESituacaoCurso.COMPLETO
                ? errors.anoFormacao?.message
                : errors.semestre?.message
            }
          />
        </S.TextSplit>
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
        {renderizarSuperiorCompleto()}
        <Controller
          name="frenteAtuacao"
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
              //error={errors.frenteAtuacao?.message}
            ></CheckboxGroup>
          )}
        />
        <TextAreaField
          label="Breve descrição sobre você"
          {...register('bio')}
          error={errors.bio?.message}
        />
        <F.ButtonContainer>
          <Button
            radius="square"
            type="submit"
            color="primary"
            size="mediumLarge"
            textTransform="uppercase"
          >
            Finalizar cadastro
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

import { TextField } from 'components/atoms/TextField'
import { ISignupVoluntarioService } from 'services/signup-voluntario-service/signup-voluntario-service'

import * as S from './styles'
import { Button } from 'components/atoms/Button'
import { useLocalStorage } from '../../../hooks/localstorage.hook'
import React, { ChangeEvent, useEffect } from 'react'
import { UserType } from '../../../enums/user-type.enum'
import { RadioField } from '../../atoms/RadioField'

import moment from 'moment'
import { PhoneField } from '../../atoms/PhoneField'
import { SelectField } from '../../atoms/SelectField'
import { States } from '../FormAluno/states'
import { TextAreaField } from '../../atoms/TextAreaField'
import { CheckboxField } from '../../atoms/CheckboxField'
import { BackendError } from '../../../types/backend-error'
import ESituacaoCurso from './situacao-curso'
import validationSchema from './validation'
import FormVoluntarioValues from './values-type'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

type FormVoluntarioProps = {
  signupVoluntarioService: ISignupVoluntarioService
  handleSuccess: () => void
  handleError: (err: BackendError) => void
}

const TYPES = {
  SUPERVISOR: 'Supervisor *',
  ATENDENTE: 'Atendente **'
}

const GENDER = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Feminino' },
  { value: 'NB', label: 'Não Binário' },
  { value: 'ND', label: 'Prefiro não Declarar' }
]

const areasAtuacao = [
  {
    value: 'professor',
    label: 'Professor de Psicologia'
  },
  {
    value: 'psicologo',
    label: 'Psicólogo'
  }
]

const optionsFormacao = [
  {
    value: ESituacaoCurso.COMPLETO,
    label: 'Superior Completo'
  },
  {
    value: ESituacaoCurso.ANDAMENTO,
    label: 'Superior em Andamento'
  }
]

const frentesCheckbox = (
  value: number[],
  cb: (e: ChangeEvent<any> | ChangeEvent<HTMLInputElement>) => void,
  ...labels: string[]
) => {
  return labels.map((label, i) => {
    return (
      <CheckboxField
        key={i}
        label={label}
        name={`frentesAtuacao${i}`}
        value={i}
        onChange={cb}
      />
    )
  })
}

export function FormVoluntario({
  signupVoluntarioService,
  handleSuccess,
  handleError
}: FormVoluntarioProps) {
  const [name] = useLocalStorage<string>('nome', '')
  const [token] = useLocalStorage<string>('token', '')
  const [email] = useLocalStorage<string>('email', '')
  const [tipo] = useLocalStorage<UserType>('tipo', UserType.ATENDENTE)

  const initialValues: FormVoluntarioValues = {
    telefone: '',
    dataNascimento: '',
    cidade: '',
    genero: '',
    UF: '',
    instituicao: '',
    formado: '',
    anoFormacao: +moment().format('YYYY'),
    semestre: 1,
    especializacoes: '',
    crp: '',
    areaAtuacao: '',
    frentes: [],
    bio: '',
    tipo: '',
    abordagem: ''
  }

  const onSubmit = async (form: FormVoluntarioValues) => {
    try {
      await signupVoluntarioService.voluntarioSignUp(
        {
          ...form,
          dataNascimento: moment(form.dataNascimento).format('YYYY-MM-DD'),
          formado:
            form.tipo == 1 ? true : form.formado === ESituacaoCurso.COMPLETO,
          tipo: +form.tipo,
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

  const {
    register,
    formState: { errors, isSubmitting, isSubmitted, isValid },
    handleSubmit,
    control,
    watch,
    setValue
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues
  })

  useEffect(() => {
    setValue('tipo', +tipo)
    setValue(
      'formado',
      +tipo === UserType.SUPERVISOR
        ? ESituacaoCurso.COMPLETO
        : ESituacaoCurso.ANDAMENTO
    )
  }, [tipo, setValue])

  return (
    <S.Form onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Nome Completo" name="name" disabled value={name} />
      <TextField label="E-mail" name="email" disabled value={email} />

      <Controller
        name="tipo"
        control={control}
        render={({ field }) => (
          <RadioField
            options={Object.values(TYPES).map((type, index) => {
              return { label: type, value: index + 1 }
            })}
            label="Tipo de voluntário:"
            error={errors.tipo?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="telefone"
        control={control}
        render={({ field }) => (
          <PhoneField
            data-testid="phone-number"
            label="Telefone"
            error={errors.telefone?.message}
            {...field}
          />
        )}
      />
      <TextField
        label="Data de nascimento"
        type="date"
        max={moment().subtract(18, 'years').format('YYYY-MM-DD')}
        error={errors.dataNascimento?.message}
        {...register('dataNascimento')}
      />
      <SelectField
        label="Estado"
        options={States}
        error={errors.UF?.message}
        {...register('UF')}
      />
      <TextField
        label="Cidade"
        error={errors.cidade?.message}
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
            {...field}
          />
        )}
      />
      <TextField
        label="Instituição de ensino"
        error={errors.instituicao?.message}
        {...register('instituicao')}
      />
      {watch('tipo') === UserType.ATENDENTE && (
        <Controller
          name="formado"
          control={control}
          render={({ field }) => (
            <RadioField
              options={optionsFormacao}
              label="Nível de Formação"
              error={errors.formado?.message}
              {...field}
            />
          )}
        />
      )}
      {watch('formado') !== ESituacaoCurso.COMPLETO &&
        watch('tipo') != UserType.SUPERVISOR && (
          <TextField
            label="Semestre"
            type="number"
            min={0}
            max={10}
            {...register('semestre')}
            error={errors.semestre?.message}
          />
        )}
      {(watch('formado') === ESituacaoCurso.COMPLETO ||
        watch('tipo') == UserType.SUPERVISOR) && (
        <>
          <TextField
            label="Ano de conclusão"
            type="number"
            data-testid="anoFormacao"
            max={+moment().format('YYYY')}
            error={errors.anoFormacao?.message}
            {...register('anoFormacao')}
          />
          <TextField
            label="CRP"
            error={errors.crp?.message}
            {...register('crp')}
          />
          <TextAreaField
            label="Possui especialização? Se sim, qual(is)?"
            error={errors.especializacoes?.message}
            {...register('especializacoes')}
          />
          <SelectField
            label="Área de Atuação"
            options={areasAtuacao}
            error={errors.areaAtuacao?.message}
            {...register('areaAtuacao')}
          />
          <TextField
            label="Abordagem psicoterápica"
            error={errors.abordagem?.message}
            {...register('abordagem')}
          />
        </>
      )}
      <S.Title>
        Selecione em quais frentes você gostaria de atuar (pode selecionar mais
        de uma opção):
      </S.Title>
      {frentesCheckbox(
        watch('frentes'),
        (e) => {
          if (e.target.checked) {
            setValue('frentes', [...watch('frentes'), +e.target.value].sort())
            // values.frentes.push(+e.target.value)
          } else {
            const novasFrentes = watch('frentes').filter(
              (value) => +e.target.value !== value
            )
            setValue('frentes', [...novasFrentes].sort())
          }
        },
        'Sessões de acolhimento dos estudantes',
        'Coaching de rotina de estudos',
        'Orientação vocacional'
      )}
      <S.FrenteError>{errors.frentes}</S.FrenteError>

      {+watch('tipo') === UserType.ATENDENTE && (
        <TextAreaField
          label="Breve descrição sobre você (Será utilizada em sua apresentação)"
          error={errors.bio?.message}
          {...register('bio')}
        />
      )}

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

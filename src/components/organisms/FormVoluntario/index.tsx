import { TextField } from 'components/atoms/TextField'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { ISignupVoluntarioService } from 'services/signup-voluntario-service/signup-voluntario-service'
import { EBrazilStates } from 'utils/enums/brazil-states.enum'

import * as S from './styles'
import { Button } from 'components/atoms/Button'
import { useLocalStorage } from '../../../hooks/localstorage.hook'
import React, { ChangeEvent } from 'react'
import { UserType } from '../../../enums/user-type.enum'
import { RadioField } from '../../atoms/RadioField'

import moment from 'moment'
import { PhoneField } from '../../atoms/PhoneField'
import { SelectField } from '../../atoms/SelectField'
import { States } from '../FormAluno/states'
import { TextAreaField } from '../../atoms/TextAreaField'
import { CheckboxField } from '../../atoms/CheckboxField'
import { BackendError } from '../../../types/backend-error'

type FormVoluntarioProps = {
  signupVoluntarioService: ISignupVoluntarioService
  handleSuccess: () => void
  handleError: (err: BackendError) => void
}

enum ESituacaoCurso {
  COMPLETO = `COMPLETO`,
  ANDAMENTO = `ANDAMENTO`
}

type MyFormValues = {
  telefone: string
  dataNascimento: string
  cidade: string
  UF: EBrazilStates | string
  genero: string
  instituicao: string
  frentes: number[]
  formado: string
  anoFormacao: number
  semestre: number
  especializacoes: string
  areaAtuacao: string
  crp: string
  bio: string
  tipo: UserType
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

const MAX_LENGTH_CITY_VALUE = 100
const MIN_LENGTH_CITY_VALUE = 3

const MAX_LENGTH_NAME_VALUE = 100
const MIN_LENGTH_NAME_VALUE = 2
const LENGTH_PHONE_VALUE = 11

const ERRORS = {
  REQUIRED_NAME: `Nome completo é obrigatório.`,
  REQUIRED_PHONE: `Telefone é obrigatório.`,
  MIN_LENGTH_NAME: `Nome deve conter mais de ${MIN_LENGTH_NAME_VALUE} caracteres.`,
  MAX_LENGTH_NAME: `Nome deve conter menos de ${MAX_LENGTH_NAME_VALUE} caracteres.`,
  LENGTH_PHONE: `Telefone deve conter ${LENGTH_PHONE_VALUE} dígitos.`,
  REQUIRED_DATA_NASCIMENTO: 'Data de nascimento é obrigatório.',
  MIN_AGE: `Voluntários devem ter mais de 18 anos.`,
  MAX_BIRTHDATE: `Data de nascimento inválida.`,
  MIN_CITY_NAME: `Cidade deve conter mais de ${MIN_LENGTH_CITY_VALUE} caracteres.`,
  MAX_CITY_NAME: `Cidade deve conter menos de ${MAX_LENGTH_CITY_VALUE} caracteres.`,
  REQUIRED_CITY: `Cidade é obrigatório.`,
  REQUIRED_STATE: `Estado é obrigatório.`,
  REQUIRED_GENDER: `Gênero é obrigatório.`,
  REQUIRED_EDUCATION: `Escolaridade é obrigatória.`,
  REQUIRED_SCHOOL_TYPE: `Tipo de escola é obrigatório.`,
  REQUIRED_SCHOOL: `Instituição é obrigatória`,
  REQUIRED_FORMATION_YEAR: `Ano de formação é obrigatório`,
  REQUIRED_CRP: `CRP é obrigatório`,
  REQUIRED_FIELD: `Área de atuação é obrigatória`,
  REQUIRED_BIO: `A Apresentação é obrigatória`,
  INVALID_YEAR: 'Ano de formação inválido',
  REQUIRED_FRONTS: 'Frentes de atuação é obrigatório'
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
  const validation = Yup.object({
    telefone: Yup.string().trim().required(ERRORS.REQUIRED_PHONE),
    dataNascimento: Yup.date()
      .required(ERRORS.REQUIRED_DATA_NASCIMENTO)
      .max(moment().subtract(18, 'years').toDate(), ERRORS.MIN_AGE)
      .min(moment().subtract(100, 'years').toDate(), ERRORS.MAX_BIRTHDATE),
    cidade: Yup.string()
      .required(ERRORS.REQUIRED_CITY)
      .trim()
      .min(MIN_LENGTH_CITY_VALUE, ERRORS.MIN_CITY_NAME)
      .max(MAX_LENGTH_CITY_VALUE, ERRORS.MAX_CITY_NAME),
    UF: Yup.string().required(ERRORS.REQUIRED_STATE),
    genero: Yup.string().required(ERRORS.REQUIRED_GENDER),
    anoFormacao: Yup.number().when('formado', {
      is: ESituacaoCurso.COMPLETO,
      then: Yup.number()
        .required(ERRORS.REQUIRED_FORMATION_YEAR)
        .max(+moment().format('YYYY'), ERRORS.INVALID_YEAR)
    }),
    crp: Yup.string().when('formado', {
      is: ESituacaoCurso.COMPLETO,
      then: Yup.string().required(ERRORS.REQUIRED_CRP)
    }),
    instituicao: Yup.string().required(ERRORS.REQUIRED_SCHOOL),
    areaAtuacao: Yup.string().when('formado', {
      is: ESituacaoCurso.COMPLETO,
      then: Yup.string().required(ERRORS.REQUIRED_FIELD)
    }),
    frentes: Yup.array().min(1, ERRORS.REQUIRED_FRONTS).required(),
    bio: Yup.string().when('tipo', {
      is: '2',
      then: Yup.string().required(ERRORS.REQUIRED_BIO)
    })
  })

  const initialValues: MyFormValues = {
    telefone: '',
    dataNascimento: '',
    cidade: '',
    genero: '',
    UF: '',
    instituicao: '',
    formado: ESituacaoCurso.ANDAMENTO,
    anoFormacao: +moment().format('YYYY'),
    semestre: 1,
    especializacoes: '',
    crp: '',
    areaAtuacao: '',
    frentes: [],
    bio: '',
    tipo: +tipo
  }

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

  const formSubmit = async (form: MyFormValues) => {
    try {
      await signupVoluntarioService.voluntarioSignUp(
        {
          ...form,
          formado:
            form.tipo == 1 ? true : form.formado === ESituacaoCurso.COMPLETO,
          tipo: +form.tipo,
          areaAtuacao: form.areaAtuacao || null,
          especializacoes: form.especializacoes || null,
          crp: form.crp || null
        },
        token
      )
      handleSuccess()
    } catch (e) {
      handleError(e)
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={formSubmit}
      validationSchema={validation}
    >
      {({
        values,
        errors,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        isValid
      }) => (
        <S.Form onSubmit={handleSubmit}>
          <TextField label="Nome Completo" name="name" disabled value={name} />
          <TextField label="E-mail" name="email" disabled value={email} />
          <PhoneField
            data-testid="phone-number"
            label="Telefone"
            name="telefone"
            onBlur={handleBlur}
            error={errors.telefone}
            value={values.telefone}
            onChange={handleChange}
          />
          <TextField
            label="Data de nascimento"
            name="dataNascimento"
            type="date"
            max={moment().subtract(18, 'years').format('YYYY-MM-DD')}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.dataNascimento}
            error={errors.dataNascimento}
          />
          <SelectField
            label="Estado"
            name="UF"
            options={States}
            onChange={handleChange}
            value={values.UF}
            error={errors.UF}
          />
          <TextField
            label="Cidade"
            name="cidade"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.cidade}
            error={errors.cidade}
          />
          <RadioField
            options={GENDER}
            name="genero"
            label="Gênero"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.genero}
            error={errors.genero}
          />
          <TextField
            label="Instituição de ensino"
            name="instituicao"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.instituicao}
            error={errors.instituicao}
          />
          {+values.tipo === 2 && (
            <RadioField
              options={[
                {
                  value: ESituacaoCurso.COMPLETO,
                  label: 'Superior Completo'
                },
                {
                  value: ESituacaoCurso.ANDAMENTO,
                  label: 'Superior em Andamento'
                }
              ]}
              name="formado"
              label="Nível de Formação"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.formado}
              error={errors.formado}
            />
          )}
          {values.formado !== ESituacaoCurso.COMPLETO && values.tipo != 1 && (
            <TextField
              label="Semestre"
              name="semestre"
              type="number"
              min={0}
              max={10}
              onChange={handleChange}
              onBlur={handleBlur}
              value={
                values.formado !== ESituacaoCurso.COMPLETO
                  ? values.semestre
                  : ''
              }
              error={errors.semestre}
            />
          )}
          {(values.formado === ESituacaoCurso.COMPLETO || values.tipo == 1) && (
            <>
              <TextField
                label="Ano de conclusão"
                name="anoFormacao"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                data-testid="anoFormacao"
                max={+moment().format('YYYY')}
                value={values.anoFormacao}
                error={errors.anoFormacao}
              />
              <TextField
                label="CRP"
                name="crp"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.crp}
                error={errors.crp}
              />
              <TextAreaField
                label="Possui especialização? Se sim, qual(is)?"
                name="especializacoes"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.especializacoes}
                error={errors.especializacoes}
              />
              <SelectField
                label="Área de Atuação"
                name="areaAtuacao"
                options={areasAtuacao}
                onChange={handleChange}
                value={values.areaAtuacao}
                error={errors.areaAtuacao}
              />
            </>
          )}
          <>
            <S.Title>
              Selecione em quais frentes você gostaria de atuar (pode selecionar
              mais de uma opção):
            </S.Title>
            {frentesCheckbox(
              values.frentes,
              (e) => {
                if (e.target.checked) {
                  setFieldValue(
                    'frentes',
                    [...values.frentes, +e.target.value].sort()
                  )
                  // values.frentes.push(+e.target.value)
                } else {
                  const novasFrentes = values.frentes.filter(
                    (value) => +e.target.value !== value
                  )
                  setFieldValue('frentes', [...novasFrentes].sort())
                }
              },
              'Sessões de acolhimento dos estudantes',
              'Coaching de rotina de estudos',
              'Orientação vocacional'
            )}
            <S.FrenteError>{errors.frentes}</S.FrenteError>
          </>
          <RadioField
            options={Object.values(TYPES).map((type, index) => {
              return { label: type, value: index + 1 }
            })}
            name="tipo"
            label="Tipo de voluntário:"
            onChange={(e) => {
              setFieldValue('formado', 'true')
              handleChange(e)
            }}
            onBlur={handleBlur}
            value={+values.tipo}
            error={errors.tipo}
          />
          {+values.tipo === 2 && (
            <TextAreaField
              label="Breve descrição sobre você (Será utilizada em sua apresentação)"
              name="bio"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.bio}
              error={errors.bio}
            />
          )}

          <S.ButtonContainer>
            <Button
              radius="square"
              disabled={isSubmitting || !isValid}
              type="submit"
            >
              CADASTRAR
            </Button>
          </S.ButtonContainer>
        </S.Form>
      )}
    </Formik>
  )
}

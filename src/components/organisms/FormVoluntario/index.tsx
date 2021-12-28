import { TextField } from 'components/atoms/TextField'
import { ISignupVoluntarioService } from 'services/signup-voluntario-service/signup-voluntario-service'

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
import ESituacaoCurso from './situacao-curso'
import { Formik } from 'formik'
import validationSchema from './validation'
import FormVoluntarioValues from './values-type'

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
    formado: +tipo == 1 ? ESituacaoCurso.COMPLETO : ESituacaoCurso.ANDAMENTO,
    anoFormacao: +moment().format('YYYY'),
    semestre: 1,
    especializacoes: '',
    crp: '',
    areaAtuacao: '',
    frentes: [],
    bio: '',
    tipo: +tipo,
    abordagem: ''
  }

  const onSubmit = async (form: FormVoluntarioValues) => {
    try {
      await signupVoluntarioService.voluntarioSignUp(
        {
          ...form,
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

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
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
          <RadioField
            options={Object.values(TYPES).map((type, index) => {
              return { label: type, value: index + 1 }
            })}
            name="tipo"
            label="Tipo de voluntário:"
            onChange={(e) => {
              setFieldValue('formado', ESituacaoCurso.COMPLETO)
              handleChange(e)
            }}
            onBlur={handleBlur}
            value={+values.tipo}
            error={errors.tipo}
          />
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
              <TextField
                label="Abordagem psicoterápica"
                name="abordagem"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.abordagem}
                error={errors.abordagem}
              />
            </>
          )}
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

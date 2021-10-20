import * as Yup from 'yup'
import { Formik } from 'formik'
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

const MAX_LENGTH_NAME_VALUE = 100
const MIN_LENGTH_NAME_VALUE = 2
const LENGTH_PHONE_VALUE = 11

const MAX_LENGTH_CITY_VALUE = 100
const MIN_LENGTH_CITY_VALUE = 3

type MyFormValues = {
  telefone: string
  dataNascimento: string
  cidade: string
  UF: string
  genero: string
  tipoEscola: string
  escolaridade: string
}

const ERRORS = {
  REQUIRED_NAME: `Nome completo é obrigatório.`,
  REQUIRED_PHONE: `Telefone é obrigatório.`,
  MIN_LENGHT_NAME: `Nome deve conter mais de ${MIN_LENGTH_NAME_VALUE} caracteres.`,
  MAX_LENGHT_NAME: `Nome deve conter menos de ${MAX_LENGTH_NAME_VALUE} caracteres.`,
  LENGHT_PHONE: `Telefone deve conter ${LENGTH_PHONE_VALUE} dígitos.`,
  REQUIRED_DATA_NASCIMENTO: 'Data de nascimento é obrigatório.',
  MAX_BIRTHDATE: `Data de nascimento inválida.`,
  MIN_CITY_NAME: `Cidade deve conter mais de ${MIN_LENGTH_CITY_VALUE} caracteres.`,
  MAX_CITY_NAME: `Cidade deve conter menos de ${MAX_LENGTH_CITY_VALUE} caracteres.`,
  REQUIRED_CITY: `Cidade é obrigatório.`,
  REQUIRED_STATE: `Estado é obrigatório.`,
  REQUIRED_GENDER: `Gênero é obrigatório.`,
  REQUIRED_SCHOLARITY: `Escolaridade é obrigatória.`,
  REQUIRED_SCHOOL_TYPE: `Tipo de escola é obrigatório.`
}

const FormAluno = (props: {
  alunoSignup: ISignupAlunoService
  handleSuccess: () => void
  handleError: (error: BackendError) => void
}) => {
  const [name] = useLocalStorage<string>('nome', '')
  const [token] = useLocalStorage<string>('token', '')
  const [email] = useLocalStorage<string>('email', '')
  const validation = Yup.object({
    telefone: Yup.string().trim().required(ERRORS.REQUIRED_PHONE),
    dataNascimento: Yup.date()
      .required(ERRORS.REQUIRED_DATA_NASCIMENTO)
      .max(moment().toDate(), ERRORS.MAX_BIRTHDATE),
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
    tipoEscola: '0'
  }

  return (
    <Formik
      initialValues={initialValues}
      validateOnChange={false}
      onSubmit={async (values) => {
        try {
          await props.alunoSignup.alunoSignup(
            {
              ...values,
              tipoEscola: +values.tipoEscola,
              escolaridade: +values.escolaridade
            },
            token
          )
          props.handleSuccess()
        } catch (e) {
          props.handleError(e)
        }
      }}
      validationSchema={validation}
    >
      {({
        values,
        errors,
        handleSubmit,
        handleChange,
        handleBlur,
        isSubmitting,
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
            max={moment().format('YYYY-MM-DD')}
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

          <SelectField
            label="Escolaridade"
            name="escolaridade"
            options={Scholarity}
            onChange={handleChange}
            value={values.escolaridade}
            error={errors.escolaridade}
          />

          <RadioField
            options={Object.values(TIPOESCOLA).map((type, index) => {
              return { label: type, value: index }
            })}
            name="tipoEscola"
            label="Tipo de Escola"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.tipoEscola}
            error={errors.tipoEscola}
          />
          <S.ButtonContainer>
            <Button
              radius="square"
              type="submit"
              color="primary"
              disabled={isSubmitting || !isValid}
            >
              Concluir minha inscrição.
            </Button>
          </S.ButtonContainer>
          <S.Link>
            <Link href="/">
              <a>Preencher depois.</a>
            </Link>
          </S.Link>
        </S.Form>
      )}
    </Formik>
  )
}

export default FormAluno

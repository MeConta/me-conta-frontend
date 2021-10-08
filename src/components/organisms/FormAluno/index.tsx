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
import { useRouter } from 'next/router'
import React from 'react'
import Link from 'next/link'

const MAX_LENGTH_NAME_VALUE = 100
const MIN_LENGTH_NAME_VALUE = 2
const LENGTH_PHONE_VALUE = 11

const MAX_LENGTH_CITY_VALUE = 100
const MIN_LENGTH_CITY_VALUE = 3

type MyFormValues = {
  name: string
  phoneNumber: string
  dataNascimento: string
  cidade: string
  estado: string
  genero: string
  escolaridade: string
  tipoEscola: string
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

const today = new Date()

const FormAluno = () => {
  const validation = Yup.object({
    name: Yup.string()
      .required(ERRORS.REQUIRED_NAME)
      .trim()
      .min(MIN_LENGTH_NAME_VALUE, ERRORS.MIN_LENGHT_NAME)
      .max(MAX_LENGTH_NAME_VALUE, ERRORS.MAX_LENGHT_NAME),
    phoneNumber: Yup.string()
      .trim()
      .min(LENGTH_PHONE_VALUE, ERRORS.LENGHT_PHONE)
      .max(LENGTH_PHONE_VALUE, ERRORS.LENGHT_PHONE)
      .required(ERRORS.REQUIRED_PHONE),
    dataNascimento: Yup.date()
      .required(ERRORS.REQUIRED_DATA_NASCIMENTO)
      .max(today, ERRORS.MAX_BIRTHDATE),
    cidade: Yup.string()
      .required(ERRORS.REQUIRED_CITY)
      .trim()
      .min(MIN_LENGTH_CITY_VALUE, ERRORS.MIN_CITY_NAME)
      .max(MAX_LENGTH_CITY_VALUE, ERRORS.MAX_CITY_NAME),
    estado: Yup.string().required(ERRORS.REQUIRED_STATE),
    genero: Yup.string().required(ERRORS.REQUIRED_GENDER),
    escolaridade: Yup.string().required(ERRORS.REQUIRED_SCHOLARITY),
    tipoEscola: Yup.string().required(ERRORS.REQUIRED_SCHOOL_TYPE)
  })

  const GENDER = {
    FEMININO: 'Feminino',
    MASCULINO: 'Masculino',
    NAO_BINARIO: 'Não Binário',
    NAO_DECLARAR: 'Prefiro não declarar'
  }

  const TIPOESCOLA = {
    PUBLICA: 'Escola Pública',
    PARTICULAR: 'Escola Particular'
  }

  const initialValues: MyFormValues = {
    name: '',
    phoneNumber: '',
    dataNascimento: '',
    cidade: '',
    estado: '',
    genero: '',
    escolaridade: '',
    tipoEscola: ''
  }
  const router = useRouter()

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={() => {
        console.log('submitted')
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
          <TextField
            label="Nome Completo"
            name="name"
            maxLength={MAX_LENGTH_NAME_VALUE}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            error={errors.name}
          />
          <PhoneField
            data-testid="phone-number"
            label="Telefone"
            name="phoneNumber"
            onBlur={handleBlur}
            error={errors.phoneNumber}
            value={values.phoneNumber}
            onChange={handleChange}
          />
          <TextField
            label="Data de nascimento"
            name="dataNascimento"
            type="date"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.dataNascimento}
            error={errors.dataNascimento}
          />
          <TextField
            label="Cidade"
            name="cidade"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.cidade}
            error={errors.cidade}
          />
          <SelectField
            label="Estado"
            name="estado"
            options={States}
            onChange={handleChange}
            value={values.estado}
            error={errors.estado}
          />
          <RadioField
            options={Object.values(GENDER).map((type, index) => {
              return { label: type, value: index }
            })}
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
              disabled={isSubmitting || !isValid}
              type="submit"
              color="primary"
            >
              Concluir minha inscrição.
            </Button>
          </S.ButtonContainer>
          <S.Link>
            <Link href="/">
              <a>Pular: preencher depois.</a>
            </Link>
          </S.Link>
        </S.Form>
      )}
    </Formik>
  )
}

export default FormAluno

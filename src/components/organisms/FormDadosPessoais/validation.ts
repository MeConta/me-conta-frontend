import * as Yup from 'yup'
import moment from 'moment'

const MAX_LENGTH_NAME_VALUE = 100
const MIN_LENGTH_NAME_VALUE = 2
const LENGTH_PHONE_VALUE = 11

const MAX_LENGTH_CITY_VALUE = 100
const MIN_LENGTH_CITY_VALUE = 3

const MIN_LENGTH_PHONE_VALUE = 10

const ERRORS = {
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

const phoneRegex = /^[1-9]{2}(?:[2-8]|9[1-9])[0-9]{3}[0-9]{4}$/

export const validationSchema = Yup.object({
  telefone: Yup.string()
    .trim()
    .required(ERRORS.REQUIRED_PHONE)
    .test({
      name: 'valid',
      message: ERRORS.INVALID_PHONE,
      test: (value) => value !== undefined && phoneRegex.test(value)
    })
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

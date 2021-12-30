import moment from 'moment'
import * as Yup from 'yup'
import ERRORS from './errors'
import ESituacaoCurso from './situacao-curso'
import {
  MAX_LENGTH_CITY_VALUE,
  MIN_LENGTH_CITY_VALUE,
  MIN_LENGTH_PHONE_VALUE
} from './constraints'

const validationSchema = Yup.object({
  telefone: Yup.string()
    .trim()
    .required(ERRORS.REQUIRED_PHONE)
    .min(MIN_LENGTH_PHONE_VALUE, ERRORS.INVALID_PHONE),
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
  semestre: Yup.number().when('formado', {
    is: ESituacaoCurso.ANDAMENTO,
    then: Yup.number()
      .required(ERRORS.REQUIRED_FORMATION_SEMESTER)
      .min(1, ERRORS.MIN_SEMESTER)
  }),
  crp: Yup.string()
    .when('formado', {
      is: ESituacaoCurso.COMPLETO,
      then: Yup.string().required(ERRORS.REQUIRED_CRP)
    })
    .when('tipo', {
      is: '1',
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

export default validationSchema

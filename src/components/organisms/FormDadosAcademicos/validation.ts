import moment from 'moment'
import * as Yup from 'yup'
import { AreaAtuacao } from './area-atuacao.enum'
import ESituacaoCurso from './situacao-curso'

export const ERRORS = {
  REQUIRED_EDUCATION: `Instituição de ensino é obrigatória`,
  REQUIRED_GRADUATION_YEAR: `Ano de formação é obrigatório`,
  REQUIRED_CRP: `CRP é obrigatório`,
  REQUIRED_FIELD: `Área de atuação é obrigatória`,
  REQUIRED_BIO: `A descrição sobre você é obrigatória`,
  INVALID_YEAR: 'Ano de formação inválido',
  REQUIRED_FRONTS: 'É obrigatório selecionar, ao menos, uma frente de formação',
  REQUIRED_SEMESTER: `Semestre de formação é obrigatório`,
  MIN_SEMESTER: 'Semestre deve ser no mínimo 1',
  MAX_SEMESTER: 'Semestre deve ser no máximo 10',
  INVALID_SEMESTER: 'Semestre inválido'
}

const convertEmptyStringToUndefined = (value: number, originalValue: number) =>
  String(originalValue).trim() === '' ? undefined : value

const validationSchema = Yup.object({
  instituicao: Yup.string().required(ERRORS.REQUIRED_EDUCATION),
  anoFormacao: Yup.number().when('nivelDeFormacao', {
    is: ESituacaoCurso.COMPLETO,
    then: Yup.number()
      .transform(convertEmptyStringToUndefined)
      .required(ERRORS.REQUIRED_GRADUATION_YEAR)
      .max(+moment().format('YYYY'), ERRORS.INVALID_YEAR)
  }),
  semestre: Yup.number().when('nivelDeFormacao', {
    is: ESituacaoCurso.ANDAMENTO,
    then: Yup.number()
      .transform(convertEmptyStringToUndefined)
      .required(ERRORS.REQUIRED_SEMESTER)
      .min(1, ERRORS.MIN_SEMESTER)
      .max(10, ERRORS.MAX_SEMESTER)
  }),
  crp: Yup.string().when('nivelDeFormacao', {
    is: ESituacaoCurso.COMPLETO,
    then: Yup.string().required(ERRORS.REQUIRED_CRP)
  }),
  areaAtuacao: Yup.string().when('nivelDeFormacao', {
    is: ESituacaoCurso.COMPLETO,
    then: Yup.string()
      .oneOf([AreaAtuacao.PROFESSOR, AreaAtuacao.PSICOLOGO])
      .required(ERRORS.REQUIRED_FIELD)
  }),
  frentes: Yup.array().min(1, ERRORS.REQUIRED_FRONTS).required(),
  bio: Yup.string().required(ERRORS.REQUIRED_BIO)
})

export default validationSchema

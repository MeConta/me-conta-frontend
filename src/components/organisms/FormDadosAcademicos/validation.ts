import moment from 'moment'
import * as Yup from 'yup'
import ESituacaoCurso from './situacao-curso'

const ERRORS = {
  REQUIRED_EDUCATION: `Instituição de ensino é obrigatória`,
  REQUIRED_FORMATION_YEAR: `Ano de formação é obrigatório`,
  REQUIRED_CRP: `CRP é obrigatório`,
  REQUIRED_FIELD: `Área de atuação é obrigatória`,
  REQUIRED_BIO: `A descrição sobre você é obrigatória`,
  INVALID_YEAR: 'Ano de formação inválido',
  REQUIRED_FRONTS: 'É obrigatório selecionar, ao menos, uma frente de formação',
  REQUIRED_FORMATION_SEMESTER: `Semestre de formação é obrigatório`,
  MIN_SEMESTER: 'Semestre deve ser no mínimo 1'
}

const validationSchema = Yup.object({
  instituicao: Yup.string().required(ERRORS.REQUIRED_EDUCATION),
  anoFormacao: Yup.number().when('nivelDeFormacao', {
    is: ESituacaoCurso.COMPLETO,
    then: Yup.number()
      .required(ERRORS.REQUIRED_FORMATION_YEAR)
      .max(+moment().format('YYYY'), ERRORS.INVALID_YEAR)
  }),
  semestre: Yup.number().when('nivelDeFormacao', {
    is: ESituacaoCurso.ANDAMENTO,
    then: Yup.number()
      .required(ERRORS.REQUIRED_FORMATION_SEMESTER)
      .min(1, ERRORS.MIN_SEMESTER)
  }),
  crp: Yup.string().when('nivelDeFormacao', {
    is: ESituacaoCurso.COMPLETO,
    then: Yup.string().required(ERRORS.REQUIRED_CRP)
  }),
  areaAtuacao: Yup.string().when('nivelDeFormacao', {
    is: ESituacaoCurso.COMPLETO,
    then: Yup.string().required(ERRORS.REQUIRED_FIELD)
  }),
  frenteAtuacao: Yup.array().min(1, ERRORS.REQUIRED_FRONTS).required(),
  bio: Yup.string().required(ERRORS.REQUIRED_BIO)
})

export default validationSchema

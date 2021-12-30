import {
  LENGTH_PHONE_VALUE,
  MAX_LENGTH_CITY_VALUE,
  MAX_LENGTH_NAME_VALUE,
  MIN_LENGTH_CITY_VALUE,
  MIN_LENGTH_NAME_VALUE
} from './constraints'

const ERRORS = {
  REQUIRED_NAME: `Nome completo é obrigatório.`,
  REQUIRED_PHONE: `Telefone é obrigatório.`,
  MIN_LENGTH_NAME: `Nome deve conter mais de ${MIN_LENGTH_NAME_VALUE} caracteres.`,
  MAX_LENGTH_NAME: `Nome deve conter menos de ${MAX_LENGTH_NAME_VALUE} caracteres.`,
  LENGTH_PHONE: `Telefone deve conter ${LENGTH_PHONE_VALUE} dígitos.`,
  INVALID_PHONE: `Telefone inválido.`,
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
  REQUIRED_FRONTS: 'Frentes de atuação é obrigatório',
  REQUIRED_FORMATION_SEMESTER: `Semestre de formação é obrigatório.`,
  MIN_SEMESTER: 'Semestre deve ser no mínimo 1.'
}

export default ERRORS

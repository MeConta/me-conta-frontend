import { UserType } from 'enums/user-type.enum'
import { EBrazilStates } from 'utils/enums/brazil-states.enum'

export type FormVoluntarioValues = {
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
  tipo: UserType | ''
  abordagem: string
}

export type DadosAcademicosValues = Pick<
  FormVoluntarioValues,
  | 'instituicao'
  | 'abordagem'
  | 'anoFormacao'
  | 'semestre'
  | 'especializacoes'
  | 'areaAtuacao'
  | 'crp'
  | 'bio'
  | 'abordagem'
> & { nivelDeFormacao: string | number } & {
  frenteAtuacao: Array<number | string>
}

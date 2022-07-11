import { EBrazilStates } from 'utils/enums/brazil-states.enum'
import { UserType } from 'enums/user-type.enum'
import { GenderTypes } from 'enums/gender.enum'
import { VolunteerResponse } from 'services/volunteers-service/volunteer-service'

export class VolunteerUsuario {
  nome: string
  tipo: UserType
  email: string
  id: number

  constructor(nome: string, tipo: UserType, email: string, id: number) {
    this.nome = nome
    this.tipo = tipo
    this.email = email
    this.id = id
  }
}

export class Volunteer {
  aprovado: boolean
  crp: string
  especializacoes: string
  areaAtuacao: string
  formado: boolean
  anoFormacao: number
  instituicao: string
  semestre: number
  frentes: number[]
  bio: string
  abordagem: string
  genero: GenderTypes
  cidade: string
  UF: keyof typeof EBrazilStates
  telefone: string
  usuario: VolunteerUsuario

  constructor(volunteer: VolunteerResponse) {
    this.aprovado = volunteer.aprovado
    this.crp = volunteer.crp
    this.especializacoes = volunteer.especializacoes
    this.areaAtuacao = volunteer.areaAtuacao
    this.formado = volunteer.formado
    this.anoFormacao = volunteer.anoFormacao
    this.instituicao = volunteer.instituicao
    this.semestre = volunteer.semestre
    this.frentes = volunteer.frentes
    this.bio = volunteer.bio
    this.abordagem = volunteer.abordagem
    this.genero = volunteer.genero
    this.cidade = volunteer.cidade
    this.UF = volunteer.UF
    this.telefone = volunteer.telefone
    this.usuario = new VolunteerUsuario(
      volunteer.usuario.nome,
      volunteer.usuario.tipo,
      volunteer.usuario.email,
      volunteer.usuario.id
    )
  }

  isEmAberto() {
    return this.aprovado == null
  }
}

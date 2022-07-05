import { AxiosInstance } from 'axios'
import { UserType } from 'enums/user-type.enum'
import { StatusAprovacao } from 'enums/volunteer-status.enum'
import { EBrazilStates } from 'utils/enums/brazil-states.enum'

export interface IVolunteerService {
  findBySessionType({
    sessionType
  }: {
    sessionType: number
  }): Promise<VolunteerResponse[]>
  findByApprovalStatus(approvalStatus: number): Promise<VolunteerResponse[]>
}

export enum Gender {
  M = 'Masculino',
  F = 'Feminino',
  NB = 'Não Binário',
  ND = 'Não Declarado'
}

export type GenderTypes = keyof typeof Gender

export interface VolunteerResponse {
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
  usuario: {
    nome: string
    tipo: UserType
    email: string
    id: number
  }
}

export class VolunteerService implements IVolunteerService {
  constructor(private readonly service: AxiosInstance) {}
  async findBySessionType({
    sessionType
  }: {
    sessionType?: number
  }): Promise<VolunteerResponse[]> {
    const res = await this.service.get(
      `/voluntarios/listar/2${
        sessionType !== undefined ? `?frente=${sessionType}` : ''
      }`
    )
    return res.data
  }
  async findByApprovalStatus(
    approvalStatus?: StatusAprovacao
  ): Promise<VolunteerResponse[]> {
    const res = await this.service.get(
      `/voluntarios/listar/2${
        approvalStatus !== undefined ? `?status=${approvalStatus}` : ''
      }`
    )
    return res.data
  }

  async findById(id: number): Promise<VolunteerResponse> {
    const res = await this.service.get(`/voluntarios/${id}`)
    return res.data
  }
}

import { AxiosInstance } from 'axios'
import { UserType } from 'enums/user-type.enum'
import { StatusAprovacao } from 'enums/volunteer-status.enum'
import { EBrazilStates } from 'utils/enums/brazil-states.enum'
import { GenderTypes } from 'enums/gender.enum'

export interface IVolunteerService {
  findBySessionType({
    sessionType
  }: {
    sessionType: number
  }): Promise<VolunteerResponse[]>
  findByApprovalStatus(approvalStatus: number): Promise<VolunteerResponse[]>
}

export interface VolunteerResponse {
  aprovado: boolean | null
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
  link: string
}

export interface VolunteerAvailableSlot {
  id: number
  voluntarioId: number
  inicio: string
  fim: string
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

  async approve(id: number, sessionLink: string): Promise<void> {
    await this.service.patch(`/admin/voluntarios/aprovar/${id}`, {
      aprovado: true,
      link: sessionLink
    })
  }

  async updateSessionLink(id: number, sessionLink: string): Promise<void> {
    await this.service.patch(`/voluntario/${id}`, {
      link: sessionLink
    })
  }

  async reject(id: number): Promise<void> {
    await this.service.patch(`/admin/voluntarios/aprovar/${id}`, {
      aprovado: false
    })
  }

  async findAvailableSlotsById(
    id: number,
    date?: Date
  ): Promise<VolunteerAvailableSlot[]> {
    let params = {}
    if (date) {
      params = { inicio: date.toISOString() }
    }
    const res = await this.service.get(
      `/voluntario/${id}/horarios-disponiveis`,
      { params }
    )
    return res.data
  }
}

import { AxiosInstance } from 'axios'
import { UserType } from 'enums/user-type.enum'

export interface IVolunteerService {
  findBySessionType({
    sessionType
  }: {
    sessionType: number
  }): Promise<VolunteerResponse[]>
}

export interface VolunteerResponse {
  crp: string
  especializacoes: string
  areaAtuacao: string
  formado: boolean
  instituicao: string
  frentes: number[]
  bio: string
  abordagem: string
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
}
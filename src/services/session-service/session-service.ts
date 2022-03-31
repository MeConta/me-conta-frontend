import { AxiosInstance } from 'axios'

export interface ISessionService {
  findAll(): Promise<any>
}

export class SessionService implements ISessionService {
  constructor(private readonly service: AxiosInstance) {}
  async findAll(): Promise<any> {
    const res = await this.service.get('/atendimento')
    return res.data
  }
}

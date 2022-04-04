import { AxiosInstance } from 'axios'

type GetListSlotsResponse = {
  voluntario: {
    id: number
  }
  slots: object
}

export class AgendaService {
  constructor(private readonly service: AxiosInstance) {}

  async listSlots(id: number): Promise<void> {
    const data = await this.service.get(`/agenda/${id}`)
  }
}

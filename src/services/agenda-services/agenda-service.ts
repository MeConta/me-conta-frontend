import { AxiosInstance } from 'axios'

export type SlotResponseInterface = {
  id: number
  inicio: string
  fim: string
}

type SingleSlot = {
  inicio: string
}

export type CreateSlotBody = {
  slots: SingleSlot[]
}

type GetListSlotsResponse = {
  voluntario: {
    id: number
  }
  slots: SlotResponseInterface[]
}

export class AgendaService {
  constructor(private readonly service: AxiosInstance) {}

  async listSlots(id: number): Promise<GetListSlotsResponse[]> {
    const res = await this.service.get(`/agenda/${id}`)

    return res.data
  }

  async deleteSlot(id: number): Promise<void> {
    return await this.service.delete(`/agenda/${id}`)
  }

  async createSlots(initialDates: Date[]) {
    const slotBody: CreateSlotBody = {
      slots: initialDates.map((date) => {
        return {
          inicio: date.toISOString()
        }
      })
    }

    await this.service.post('/agenda', slotBody)
  }
}

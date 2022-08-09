import { VolunteerAvailableSlot } from 'services/volunteers-service/volunteer-service'

export class AvailableSlot {
  id: number
  voluntarioId: number
  inicio: Date
  fim: Date

  constructor(slot: VolunteerAvailableSlot) {
    this.id = slot.id
    this.voluntarioId = slot.voluntarioId
    this.inicio = new Date(slot.inicio)
    this.fim = new Date(slot.fim)
  }
}

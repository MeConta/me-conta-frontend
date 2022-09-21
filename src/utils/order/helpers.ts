import { VolunteerAvailableSlot } from '../../services/volunteers-service/volunteer-service'

function convertSlotsIntoString(dateSlot: VolunteerAvailableSlot) {
  return new Date(dateSlot.inicio).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

export const sortSlotsByTime = (dateSlot: VolunteerAvailableSlot[]) => {
  return dateSlot.sort((a, b) => {
    const x = convertSlotsIntoString(a)
    const y = convertSlotsIntoString(b)
    return x == y ? 0 : x > y ? 1 : -1
  })
}

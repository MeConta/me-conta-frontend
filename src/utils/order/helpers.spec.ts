import { sortSlotsByTime } from './helpers'
import { VolunteerAvailableSlot } from '../../services/volunteers-service/volunteer-service'

describe('Order slots Helper', () => {
  it('Volunteer available slots should be ordered', () => {
    let disorderedAvailableSlotMock: VolunteerAvailableSlot[] = [
      {
        id: 508,
        voluntarioId: 4252,
        inicio: '2022-09-22T19:00:00.000Z',
        fim: '2022-09-22T20:00:00.000Z'
      },
      {
        id: 506,
        voluntarioId: 4252,
        inicio: '2022-09-22T08:00:00.000Z',
        fim: '2022-09-22T09:00:00.000Z'
      },
      {
        id: 507,
        voluntarioId: 4252,
        inicio: '2022-09-22T15:30:00.000Z',
        fim: '2022-09-22T16:30:00.000Z'
      },
      {
        id: 510,
        voluntarioId: 4252,
        inicio: '2022-09-22T14:30:00.000Z',
        fim: '2022-09-22T15:30:00.000Z'
      },
      {
        id: 509,
        voluntarioId: 4252,
        inicio: '2022-09-22T23:00:00.000Z',
        fim: '2022-09-23T00:00:00.000Z'
      }
    ]
    let orderedAvailableSlotMock: VolunteerAvailableSlot[] = [
      {
        id: 506,
        voluntarioId: 4252,
        inicio: '2022-09-22T08:00:00.000Z',
        fim: '2022-09-22T09:00:00.000Z'
      },
      {
        id: 510,
        voluntarioId: 4252,
        inicio: '2022-09-22T14:30:00.000Z',
        fim: '2022-09-22T15:30:00.000Z'
      },
      {
        id: 507,
        voluntarioId: 4252,
        inicio: '2022-09-22T15:30:00.000Z',
        fim: '2022-09-22T16:30:00.000Z'
      },
      {
        id: 508,
        voluntarioId: 4252,
        inicio: '2022-09-22T19:00:00.000Z',
        fim: '2022-09-22T20:00:00.000Z'
      },
      {
        id: 509,
        voluntarioId: 4252,
        inicio: '2022-09-22T23:00:00.000Z',
        fim: '2022-09-23T00:00:00.000Z'
      }
    ]

    let orderedAvailableSlotByTime: VolunteerAvailableSlot[] = sortSlotsByTime(
      disorderedAvailableSlotMock
    )

    expect(orderedAvailableSlotMock).toEqual(orderedAvailableSlotByTime)
  })
})

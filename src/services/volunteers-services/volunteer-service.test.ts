import { UserType } from 'enums/user-type.enum'
import { SessionType } from 'utils/enums/session-type.enum'
import { api } from '../../services/api/api'
import { VolunteerService } from './volunteer-service'

jest.mock('../../services/api/api')

describe('Volunteers service', () => {
  it('should get vounteers given a type', async () => {
    jest.spyOn(api, 'get').mockReturnValue({
      // @ts-ignore
      data: []
    })
    const service = new VolunteerService(api)

    const response = await service.findVolunteers({
      type: UserType.ATENDENTE,
      sessionType: SessionType.ACOLHIMENTO
    })

    expect(response).toBeDefined()
  })
})

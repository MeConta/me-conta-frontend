import { AgendaService } from './agenda-service'
import * as axios from 'axios'

describe('Agenda Service', () => {
  let service: AgendaService
  jest.mock('axios')

  beforeEach(() => {
    service = new AgendaService(axios.default)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should get list of slots of a volunteer', async () => {
    jest.spyOn(axios.default, 'get').mockResolvedValue({
      voluntario: {
        id: 6
      },
      slots: {}
    })

    await service.listSlots(1)

    expect(axios.default.get).toBeCalled()
  })
})

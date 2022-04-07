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
      slots: []
    })

    await service.listSlots(6)

    expect(axios.default.get).toBeCalled()
    expect(axios.default.get).toBeCalledWith(`/agenda/6`)
    expect(axios.default.get).toReturn()
  })

  it('should delete a slot of a volunteer', async () => {
    jest.spyOn(axios.default, 'delete').mockResolvedValue('true')

    await service.deleteSlot(6)

    expect(axios.default.delete).toBeCalled()
    expect(axios.default.delete).toBeCalledWith('/agenda/6')
  })

  it('should create slots of a volunteer', async () => {
    jest.spyOn(axios.default, 'post').mockResolvedValue('created')

    const dateAux = new Date(2022, 5, 12, 13, 0, 0, 0)
    const dateAux2 = new Date(2022, 5, 1, 13, 0, 0, 0)

    const datesAux = [dateAux, dateAux2]

    const createSlotBody = {
      slots: [
        {
          inicio: dateAux.toISOString()
        },
        {
          inicio: dateAux2.toISOString()
        }
      ]
    }

    await service.createSlots(datesAux)

    expect(axios.default.post).toBeCalled()
    expect(axios.default.post).toBeCalledWith('/agenda', createSlotBody)
  })
})

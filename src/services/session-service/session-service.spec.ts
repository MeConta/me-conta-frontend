import { SessionService } from './session-service'

describe('session-service', () => {
  const mockedService: any = {
    get: jest.fn()
  }

  const makeSut = () => {
    return new SessionService(mockedService as any)
  }

  it('should list sessions', async () => {
    const fakeRes = [
      {
        any: 'thing'
      }
    ]

    jest.spyOn(mockedService, 'get').mockResolvedValue({
      data: fakeRes
    })
    const sut = makeSut()

    const response = await sut.findAll()

    expect(mockedService.get).toHaveBeenCalledWith('/atendimento')
    expect(response).toEqual(fakeRes)
  })
})

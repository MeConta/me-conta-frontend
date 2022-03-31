import { VolunteerService } from './volunteer-service'

describe('volunteers service', () => {
  const fakeAxios: any = {
    get: () => {}
  }

  const makeSut = () => {
    return new VolunteerService(fakeAxios)
  }

  it('should list volunteers', async () => {
    const sut = makeSut()
    const sessionType = 1
    const volunteerType = 2
    jest.spyOn(fakeAxios, 'get').mockResolvedValue({
      data: []
    })

    const res = await sut.findBySessionType({ sessionType })

    expect(fakeAxios.get).toHaveBeenCalledWith(
      `/voluntarios/listar/${volunteerType}?frente=${sessionType}`
    )
    expect(res).toEqual([])
  })
})

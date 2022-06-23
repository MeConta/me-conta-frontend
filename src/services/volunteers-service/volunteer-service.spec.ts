import { StatusAprovacao } from 'enums/volunteer-status.enum'
import { VolunteerService } from './volunteer-service'

describe('volunteers service', () => {
  const fakeAxios: any = {
    get: jest.fn()
  }

  const makeSut = () => {
    return new VolunteerService(fakeAxios)
  }

  it('should list volunteers filtered by session type', async () => {
    const sut = makeSut()
    const sessionType = 0
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

  it('should list all volunteers', async () => {
    const sut = makeSut()
    const volunteerType = 2
    jest.spyOn(fakeAxios, 'get').mockResolvedValue({
      data: []
    })

    const res = await sut.findBySessionType({})

    expect(fakeAxios.get).toHaveBeenCalledWith(
      `/voluntarios/listar/${volunteerType}`
    )
    expect(res).toEqual([])
  })

  it('should list volunteers filtered by status', async () => {
    const sut = makeSut()
    const approvalStatus = 0
    const volunteerType = StatusAprovacao.APROVADO
    jest.spyOn(fakeAxios, 'get').mockResolvedValue({
      data: []
    })

    const res = await sut.findByApprovalStatus(approvalStatus)

    expect(fakeAxios.get).toHaveBeenCalledWith(
      `/voluntarios/listar/${volunteerType}?status=${approvalStatus}`
    )
    expect(res).toEqual([])
  })
})

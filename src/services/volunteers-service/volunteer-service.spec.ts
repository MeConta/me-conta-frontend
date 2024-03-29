import { StatusAprovacao } from 'enums/volunteer-status.enum'
import { VolunteerService } from './volunteer-service'

describe('volunteers service', () => {
  const fakeAxios: any = {
    get: jest.fn(),
    patch: jest.fn()
  }

  const makeSut = () => {
    return new VolunteerService(fakeAxios)
  }

  const volunteer = {
    anoFormacao: 2020,
    aprovado: true,
    areaAtuacao: 'professor',
    bio: 'string',
    crp: 'string',
    especializacoes: 'string',
    formado: true,
    frentes: [1],
    instituicao: 'string',
    semestre: 0,
    usuario: {
      tipo: '1',
      id: 0,
      dataTermos: '2022-06-30T18:37:03.964Z',
      email: 'teste@teste.com',
      nome: 'string'
    },
    abordagem: 'string',
    genero: 'ND',
    cidade: 'Cidade',
    UF: 'ES',
    telefone: '99999999999'
  }

  const volunteerSlots = [
    {
      id: 30,
      voluntarioId: 3575,
      inicio: '2022-08-12T03:30:00.000Z',
      fim: '2022-08-12T04:30:00.000Z'
    },
    {
      id: 31,
      voluntarioId: 3575,
      inicio: '2022-08-12T07:00:00.000Z',
      fim: '2022-08-12T08:00:00.000Z'
    },
    {
      id: 32,
      voluntarioId: 3575,
      inicio: '2022-08-12T09:30:00.000Z',
      fim: '2022-08-12T10:30:00.000Z'
    },
    {
      id: 34,
      voluntarioId: 3575,
      inicio: '2022-08-12T08:30:00.000Z',
      fim: '2022-08-12T09:30:00.000Z'
    },
    {
      id: 35,
      voluntarioId: 3575,
      inicio: '2022-08-12T12:00:00.000Z',
      fim: '2022-08-12T13:00:00.000Z'
    },
    {
      id: 36,
      voluntarioId: 3575,
      inicio: '2022-08-12T13:30:00.000Z',
      fim: '2022-08-12T14:30:00.000Z'
    },
    {
      id: 37,
      voluntarioId: 3575,
      inicio: '2022-08-12T06:00:00.000Z',
      fim: '2022-08-12T07:00:00.000Z'
    },
    {
      id: 38,
      voluntarioId: 3575,
      inicio: '2022-08-12T15:00:00.000Z',
      fim: '2022-08-12T16:00:00.000Z'
    },
    {
      id: 39,
      voluntarioId: 3575,
      inicio: '2022-08-14T05:00:00.000Z',
      fim: '2022-08-14T06:00:00.000Z'
    },
    {
      id: 40,
      voluntarioId: 3575,
      inicio: '2022-08-14T07:30:00.000Z',
      fim: '2022-08-14T08:30:00.000Z'
    }
  ]

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

  it('should get volunteer details by id', async () => {
    const sut = makeSut()
    const id = 1

    jest.spyOn(fakeAxios, 'get').mockResolvedValue({
      data: volunteer
    })

    const res = await sut.findById(id)

    expect(fakeAxios.get).toHaveBeenLastCalledWith(`/voluntarios/${id}`)
    expect(res).toEqual(volunteer)
  })

  it('should approve volunteer by id', async () => {
    const sut = makeSut()
    const id = 1
    const sessionLink = ''

    jest.spyOn(fakeAxios, 'patch').mockResolvedValue({})

    await sut.approve(id, sessionLink)

    expect(fakeAxios.patch).toHaveBeenLastCalledWith(
      `/admin/voluntarios/aprovar/${id}`,
      {
        aprovado: true,
        link: sessionLink
      }
    )
  })

  it('should reject volunteer by id', async () => {
    const sut = makeSut()
    const id = 1

    jest.spyOn(fakeAxios, 'patch').mockResolvedValue({})

    await sut.reject(id)

    expect(fakeAxios.patch).toHaveBeenLastCalledWith(
      `/admin/voluntarios/aprovar/${id}`,
      {
        aprovado: false
      }
    )
  })

  it('should get volunteer available slots by id', async () => {
    const sut = makeSut()
    const id = 1

    jest.spyOn(fakeAxios, 'get').mockResolvedValue({
      data: volunteerSlots
    })

    const res = await sut.findAvailableSlotsById(id)

    expect(fakeAxios.get).toHaveBeenLastCalledWith(
      `/voluntario/${id}/horarios-disponiveis`,
      {
        params: {}
      }
    )
    expect(res).toEqual(volunteerSlots)
  })
})

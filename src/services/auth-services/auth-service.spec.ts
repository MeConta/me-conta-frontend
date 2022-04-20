import { AuthService } from './auth-service'

import * as axios from 'axios'

describe('AuthService', () => {
  let service: AuthService
  jest.mock('axios')
  beforeEach(() => {
    service = new AuthService(axios.default)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Should instantiate the service', () => {
    expect(service).toBeDefined()
  })

  it('Should do a post request to /senha/recuperacao/', async () => {
    jest.spyOn(axios.default, 'post').mockResolvedValue({ data: 'data' })
    await service.recuperarSenha('teste@teste.com')
    expect(axios.default.post).toBeCalled()
    expect(axios.default.post).toBeCalledWith('/senha/recuperacao/', {
      email: 'teste@teste.com'
    })
  })

  it('Should do a post request to /senha/reset/', async () => {
    jest.spyOn(axios.default, 'post').mockResolvedValue({ data: 'data' })
    await service.resetarSenha({
      hash: 'hash',
      senha: 's3nh$F0R!3'
    })
    expect(axios.default.post).toBeCalled()
    expect(axios.default.post).toBeCalledWith('/senha/reset/', {
      senha: 's3nh$F0R!3',
      hash: 'hash'
    })
  })

  it('should be able to refresh the token using /auth/refresh endpoint', async () => {
    const mockedRefreshResponse = {
      token: 'new-token',
      refreshToken: 'new-refresh-token',
      nome: 'John Doe',
      tipo: 0
    }
    jest.spyOn(axios.default, 'post').mockResolvedValue({
      data: mockedRefreshResponse
    })
    const mockedRefreshToken = '1dadawoawkowa'

    const response = await service.refreshToken({
      refreshToken: mockedRefreshToken
    })

    expect(axios.default.post).toHaveBeenCalledWith('/auth/refresh', {
      refreshToken: mockedRefreshToken
    })
    expect(response).toEqual(mockedRefreshResponse)
  })
})

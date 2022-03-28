import { AuthService } from './auth-service'

import * as axios from 'axios'
import { UserType } from '../../enums/user-type.enum'

describe('AuthService', () => {
  let service: AuthService
  jest.mock('axios')
  beforeEach(() => {
    service = new AuthService(axios.default)
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Deve instanciar o serviço', () => {
    expect(service).toBeDefined()
  })

  it('Must do a post request to /auth/login/', async () => {
    jest.spyOn(axios.default, 'post').mockResolvedValue({
      data: {
        token: 'mocked',
        tipo: UserType.ATENDENTE,
        nome: 'Jack Tester'
      }
    })
    await service.login({
      email: 'teste@teste.com',
      senha: 's3nh$F0R!3'
    })
    expect(axios.default.post).toBeCalled()
    expect(axios.default.post).toReturn()
    expect(axios.default.post).toBeCalledWith('/auth/login/', {
      password: 's3nh$F0R!3',
      username: 'teste@teste.com'
    })
  })

  it('Must do a post request to /senha/recuperacao/', async () => {
    jest.spyOn(axios.default, 'post')
    await service.recuperarSenha('teste@teste.com')
    expect(axios.default.post).toBeCalled()
    expect(axios.default.post).toBeCalledWith('/senha/recuperacao/', {
      email: 'teste@teste.com'
    })
  })

  it('Must do a post request to /senha/reset/', async () => {
    jest.spyOn(axios.default, 'post')
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
})

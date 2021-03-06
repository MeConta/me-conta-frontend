import { SignupService } from './signup-service'

import * as axios from 'axios'
import { UserType } from '../../enums/user-type.enum'

describe('SignupService', () => {
  let service: SignupService
  jest.mock('axios')
  beforeEach(() => {
    service = new SignupService(axios.default)
  })
  it('Deve instanciar o serviço', () => {
    expect(service).toBeDefined()
  })

  it('Deve chamar o post do axios', async () => {
    jest
      .spyOn(axios.default, 'post')
      .mockResolvedValue(null)
      .mockResolvedValue({
        data: {
          token: 'mocked'
        }
      })
    await service.initialSignup({
      email: 'teste@teste.com',
      nome: 'Fulano de tal',
      senha: 's3nh$F0R!3',
      tipo: UserType.ALUNO
    })
    expect(axios.default.post).toBeCalled()
  })
})

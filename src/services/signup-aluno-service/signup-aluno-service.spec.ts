import { SignupAlunoService } from './signup-aluno-service'
import * as axios from 'axios'

describe('Signup Aluno Service', () => {
  let service: SignupAlunoService
  jest.mock('axios')
  beforeEach(() => {
    service = new SignupAlunoService(axios.default)
  })

  it('Should be defined.', () => {
    expect(service).toBeDefined()
  })

  it('Post should be called.', async () => {
    jest.spyOn(axios.default, 'post').mockResolvedValue(null)

    await service.alunoSignup(
      {
        telefone: '(32)3456-6543',
        dataNascimento: '18/01/1992',
        cidade: 'Araxá',
        UF: 'MG',
        genero: 'Não Binário',
        escolaridade: 1,
        tipoEscola: 0
      },
      'MOCKED_TOKEN'
    )

    expect(axios.default.post).toBeCalled()
  })
})

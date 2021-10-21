import { SignupVoluntarioService } from './signup-voluntario-service'
import * as axios from 'axios'

describe('Signup Voluntario Service', () => {
  let service: SignupVoluntarioService
  jest.mock('axios')
  beforeEach(() => {
    service = new SignupVoluntarioService(axios.default)
  })

  it('Should be defined.', () => {
    expect(service).toBeDefined()
  })

  it('Post should be called.', async () => {
    jest.spyOn(axios.default, 'post').mockResolvedValue(null)

    await service.voluntarioSignUp(
      {
        telefone: '93934566543',
        dataNascimento: '1992-01-18',
        cidade: 'Araxá',
        estado: 'MG',
        genero: 'M',
        instituicao: 'UFRJ',
        frentes: [1],
        formado: 0,
        anoFormacao: 2005,
        semestre: 2,
        especializacoes: 'teste',
        areaAtuacao: 'teste',
        crp: '1234567',
        bio: 'bio do test'
      },
      'MOCKED_TOKEN'
    )

    expect(axios.default.post).toBeCalled()
  })
})

import { AxiosInstance } from 'axios'

type AlunoSignupUser = {
  telefone: string
  dataNascimento: string
  cidade: string
  UF: string
  genero: string
  tipoEscola: number
  escolaridade: number
}

export interface ISignupAlunoService {
  alunoSignup: (user: AlunoSignupUser, token: string) => Promise<void>
}

export class SignupAlunoService implements ISignupAlunoService {
  constructor(private readonly service: AxiosInstance) {}

  async alunoSignup(user: AlunoSignupUser, token: string) {
    await this.service.post('/cadastro-aluno', user, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}

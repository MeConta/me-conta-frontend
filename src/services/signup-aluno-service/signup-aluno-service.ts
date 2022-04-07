import { AxiosInstance } from 'axios'

type AlunoSignupUser = {
  telefone: string
  dataNascimento: string
  cidade: string
  UF: string
  genero: string
  tipoEscola: number
  escolaridade: number
  necessidades: string | null
  expectativas: string | null
  tratamentos: string | null
}

export interface ISignupAlunoService {
  alunoSignup: (user: AlunoSignupUser, token: string) => Promise<void>
}

export class SignupAlunoService implements ISignupAlunoService {
  constructor(private readonly service: AxiosInstance) {}

  async alunoSignup(
    user: {
      UF: string
      telefone: string
      cidade: string
      tipoEscola: number
      genero: string
      escolaridade: number
      dataNascimento: string
    },
    token: string
  ): Promise<void> {
    await this.service.post('/cadastro-aluno', user, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}

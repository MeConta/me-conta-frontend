import { AxiosInstance } from 'axios'
import { EBrazilStates } from 'utils/enums/brazil-states.enum'

type VoluntarioSignupUser = {
  telefone: string
  dataNascimento: string
  cidade: string
  estado: EBrazilStates | string
  genero: string
  instituicao: string
  frentes: number[]
  formado: number
  anoFormacao: number
  semestre: number
  especializacoes: string
  areaAtuacao: string
  crp: string
  bio: string
}

export interface ISignupVoluntarioService {
  voluntarioSignUp: (user: VoluntarioSignupUser, token: string) => Promise<void>
}

export class SignupVoluntarioService implements ISignupVoluntarioService {
  constructor(private readonly service: AxiosInstance) {}

  async voluntarioSignUp(user: VoluntarioSignupUser, token: string) {
    await this.service.post('/cadastro-voluntario', user, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
}

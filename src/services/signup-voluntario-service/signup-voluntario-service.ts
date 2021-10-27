import { UserType } from './../../enums/user-type.enum'
import { AxiosInstance } from 'axios'
import { EBrazilStates } from 'utils/enums/brazil-states.enum'

type VoluntarioSignupUser = {
  telefone: string
  dataNascimento: string
  cidade: string
  UF: EBrazilStates | string
  genero: string
  instituicao: string
  frentes: number[]
  formado: boolean
  anoFormacao: number
  semestre: number
  especializacoes: string | null
  areaAtuacao: string | null
  crp: string | null
  bio: string
  tipo: UserType
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

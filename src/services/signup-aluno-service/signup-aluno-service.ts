import axios from 'axios'

type AlunoSignupUser = {
  telefone: string
  dataNascimento: string
  cidade: string
  estado: string
  genero: string
  tipoEscola: number
  escolaridade: number
}

export interface ISignupAlunoService {
  alunoSignup: (user: AlunoSignupUser) => Promise<void>
}

export class SignupAlunoService implements ISignupAlunoService {
  constructor() {}

  async alunoSignup(user: AlunoSignupUser) {
    await axios.post('http://localhost:3000/cadastro-aluno', user, {
      headers: {
        Authorization: `Bearer ${window.localStorage.getItem('token')}`
      }
    })
  }
}

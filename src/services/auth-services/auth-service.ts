import { AxiosInstance } from 'axios'
import { UserType } from 'enums/user-type.enum'

type ResetSenhaForm = {
  hash: string
  senha: string
}

type LoginResponse = {
  token: string
  tipo: UserType
  nome: string
  refreshToken: string
}

export interface IAuthService {
  logout(): Promise<void>
  recuperarSenha?(email: string): Promise<void>
  resetarSenha?(form: ResetSenhaForm): Promise<void>
}

export class AuthService implements IAuthService {
  constructor(private readonly service: AxiosInstance) {}

  async logout() {
    await this.service.post('/auth/logout', {})
  }

  async recuperarSenha(email: string): Promise<void> {
    await this.service.post('/senha/recuperacao/', {
      email
    })
  }

  async resetarSenha(form: ResetSenhaForm): Promise<void> {
    await this.service.post('/senha/reset/', {
      hash: form.hash,
      senha: form.senha
    })
  }

  async refreshToken({
    refreshToken
  }: {
    refreshToken: string
  }): Promise<LoginResponse> {
    const response = await this.service.post('/auth/refresh', { refreshToken })
    return {
      refreshToken: response.data.refreshToken,
      token: response.data.token,
      nome: response.data.nome,
      tipo: response.data.tipo
    }
  }
}

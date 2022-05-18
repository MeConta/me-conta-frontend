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

enum Routes {
  LOGOUT = '/auth/logout',
  RECUPERAR_SENHA = '/senha/recuperacao/',
  RESETAR_SENHA = '/senha/reset/',
  RECARREGAR_TOKEN = '/auth/refresh'
}

export interface IAuthService {
  logout(): Promise<void>
  recuperarSenha?(email: string): Promise<void>
  resetarSenha?(form: ResetSenhaForm): Promise<void>
  validarHash(hash: string): Promise<void>
}

export class AuthService implements IAuthService {
  constructor(private readonly service: AxiosInstance) {}

  async logout() {
    await this.service.post(Routes.LOGOUT, {})
  }

  async recuperarSenha(email: string): Promise<void> {
    await this.service.post(Routes.RECUPERAR_SENHA, {
      email
    })
  }

  async resetarSenha(form: ResetSenhaForm): Promise<void> {
    await this.service.post(Routes.RESETAR_SENHA, {
      hash: form.hash,
      senha: form.senha
    })
  }

  async validarHash(hash: string): Promise<void> {
    await this.service.get(`${Routes.RESETAR_SENHA}${hash}`)
  }

  async refreshToken({
    refreshToken
  }: {
    refreshToken: string
  }): Promise<LoginResponse> {
    const response = await this.service.post(Routes.RECARREGAR_TOKEN, {
      refreshToken
    })
    return {
      refreshToken: response.data.refreshToken,
      token: response.data.token,
      nome: response.data.nome,
      tipo: response.data.tipo
    }
  }
}

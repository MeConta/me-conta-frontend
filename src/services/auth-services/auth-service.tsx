import { AxiosInstance } from 'axios'
import { createContext, PropsWithChildren, useContext } from 'react'

type LoginForm = {
  email: string
  senha: string
}

type ResetSenhaForm = {
  hash: string
  senha: string
}

export interface IAuthService {
  login(form: LoginForm): Promise<{ token: string; tipo: string }>
  recuperarSenha?(email: string): Promise<void>
  resetarSenha?(form: ResetSenhaForm): Promise<void>
}

export class AuthService implements IAuthService {
  constructor(private readonly service: AxiosInstance) {}
  async login(form: LoginForm): Promise<{
    token: string
    tipo: string
  }> {
    const response = await this.service.post('/auth/login/', {
      username: form.email,
      password: form.senha
    })
    return {
      token: response.data.token,
      tipo: response.data.tipo
    }
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
}

type AuthServiceProps = {
  authService: IAuthService
}

const AuthorizationContext = createContext<AuthServiceProps>(
  {} as AuthServiceProps
)

export const AuthorizationProvider = (
  props: PropsWithChildren<{ authService: IAuthService }>
) => {
  return (
    <AuthorizationContext.Provider value={{ authService: props.authService }}>
      {props.children}
    </AuthorizationContext.Provider>
  )
}

export function useAuthService(): AuthServiceProps {
  const context = useContext(AuthorizationContext)
  return context
}

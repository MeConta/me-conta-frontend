import { AxiosInstance } from 'axios'
import { createContext, PropsWithChildren, useContext } from 'react'

type LoginForm = {
  email: string
  senha: string
}

export interface IAuthService {
  login(form: LoginForm): Promise<{ token: string }>
}

export class AuthService implements IAuthService {
  constructor(private readonly service: AxiosInstance) {}
  async login(form: LoginForm): Promise<{
    token: string
  }> {
    await this.service.post('/cadastro-inicial/', form)
    const response = await this.service.post('/auth/login/', {
      username: form.email,
      password: form.senha
    })
    return {
      token: response.data.token
    }
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

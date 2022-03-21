import { AxiosInstance } from 'axios'
import { UserType } from 'enums/user-type.enum'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { useLocalStorage } from '../../hooks/localstorage.hook'
import { useJwt } from 'react-jwt'

type LoginForm = {
  email: string
  senha: string
}

type ResetSenhaForm = {
  hash: string
  senha: string
}

type LoginResponse = { token: string; tipo: UserType; nome: string }

export interface IAuthService {
  login(form: LoginForm): Promise<LoginResponse>
  logout(): Promise<void>
  recuperarSenha?(email: string): Promise<void>
  resetarSenha?(form: ResetSenhaForm): Promise<void>
}

export class AuthService implements IAuthService {
  constructor(private readonly service: AxiosInstance) {}
  async login(form: LoginForm): Promise<LoginResponse> {
    const response = await this.service.post('api/auth/login/', {
      username: form.email,
      password: form.senha
    })
    return {
      token: response.data.token,
      tipo: parseInt(response.data.tipo, 10) as UserType,
      nome: response.data.nome
    }
  }

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
}

type SessionData = {
  nome: string
  tipo: string
  token: string
}

type DecodedToken = {
  email: string
  exp: number
  iat: number
  roles: number[]
  sub: number
}

type AuthServiceProps = {
  authService: IAuthService
  isLoggedIn: boolean
  session: SessionData
  storeSessionData: (session: SessionData) => void
  clearSessionData: () => void
}

const LocalStorageAuthKeys: { [key: string]: string } = {
  TOKEN: 'token',
  NOME: 'nome',
  TIPO: 'tipo'
}

const AuthorizationContext = createContext<AuthServiceProps>(
  {} as AuthServiceProps
)

export const AuthorizationProvider = (
  props: PropsWithChildren<{ authService: IAuthService }>
) => {
  const [token, setToken] = useLocalStorage(LocalStorageAuthKeys.TOKEN, '')
  const [nome, setNome] = useLocalStorage(LocalStorageAuthKeys.NOME, '')

  const jwtData = useJwt(token)
  const decodedToken = jwtData.decodedToken as DecodedToken

  const [tipo, setTipo] = useState<string>(
    decodedToken?.roles?.[0]?.toString() || ''
  )

  useEffect(() => {
    if (decodedToken && decodedToken.roles) {
      setTipo(decodedToken.roles[0].toString())
    }
  }, [decodedToken])

  const storeSessionDataHandler = (session: SessionData) => {
    setToken(session.token)
    setNome(session.nome)
    setTipo(session.tipo)
  }

  const clearSessionDataHandler = () => {
    setToken('')
    setNome('')
    setTipo('')
  }

  const session: SessionData = {
    nome,
    tipo,
    token
  }
  return (
    <AuthorizationContext.Provider
      value={{
        authService: props.authService,
        isLoggedIn: !!session.token,
        session,
        storeSessionData: storeSessionDataHandler,
        clearSessionData: clearSessionDataHandler
      }}
    >
      {props.children}
    </AuthorizationContext.Provider>
  )
}

export function useAuthService(): AuthServiceProps {
  const context = useContext(AuthorizationContext)
  return context
}

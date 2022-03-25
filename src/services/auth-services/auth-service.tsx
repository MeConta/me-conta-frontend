import { AxiosInstance } from 'axios'
import { setCookie, parseCookies, destroyCookie } from 'nookies'
import { UserType } from 'enums/user-type.enum'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { parseJwtToObject } from '../../utils/convertions/convertions-jwt'
import { DecodedToken } from 'types/data'
import { useRouter } from 'next/router'

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
    const response = await this.service.post('/auth/login/', {
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

type AuthServiceProps = {
  authService: IAuthService
  isLoggedIn: boolean
  session: SessionData
  handleLogin: (session: SessionData) => void
  handleLogout: () => void
}

const LocalStorageAuthKeys: { [key: string]: string } = {
  TOKEN: 'token',
  NOME: 'nome',
  TIPO: 'tipo'
}

const AuthorizationContext = createContext<AuthServiceProps>(
  {} as AuthServiceProps
)

let automaticLogoutTimer: NodeJS.Timeout | null

export const AuthorizationProvider = (
  props: PropsWithChildren<{ authService: IAuthService }>
) => {
  const isTokenValid = (decodedToken: DecodedToken | null): boolean => {
    if (!decodedToken || !decodedToken.exp) {
      return false
    }
    return decodedToken.exp * 1000 > Date.now()
  }

  const createAutomaticLogoutTimer = (decodedToken: DecodedToken) => {
    const nowInMs = new Date().getTime()
    const expirationInMs = new Date(decodedToken.exp * 1000).getTime()
    const currentDuration = expirationInMs - nowInMs
    if (currentDuration > 0) {
      setTimeout(() => logoutHandler(true), currentDuration)
    }
  }

  const router = useRouter()
  const { nome: nomeCookie, token: tokenCookie } = parseCookies()
  const decodedToken = parseJwtToObject(tokenCookie)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    isTokenValid(decodedToken)
  )
  const [nome, setNome] = useState<string | null>(null)
  const [tipo, setTipo] = useState<string | null>(null)

  useEffect(() => {
    if (isTokenValid(decodedToken)) {
      setIsLoggedIn(true)
      setNome(nomeCookie)
      setTipo(decodedToken?.roles?.[0].toString() as string)
      createAutomaticLogoutTimer(decodedToken as DecodedToken)
    } else {
      setIsLoggedIn(false)
    }
  }, [decodedToken])

  const loginHandler = (session: SessionData) => {
    setNome(session.nome)
    setTipo(session.tipo)
    setCookie(undefined, 'token', session.token)
    setCookie(undefined, 'nome', session.nome)
    setIsLoggedIn(true)
    createAutomaticLogoutTimer(parseJwtToObject(session.token) as DecodedToken)
  }

  const logoutHandler = (autoLogout: boolean = false) => {
    destroyCookie(null, 'token')
    destroyCookie(null, 'nome')
    setNome(null)
    setTipo(null)
    setIsLoggedIn(false)

    router.push(autoLogout ? '/login?automatic=true' : '/login')
  }

  const session: SessionData = {
    nome: nome || '',
    tipo: tipo || '',
    token: tokenCookie
  }

  return (
    <AuthorizationContext.Provider
      value={{
        authService: props.authService,
        isLoggedIn: isLoggedIn,
        session,
        handleLogin: loginHandler,
        handleLogout: logoutHandler
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

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
import { parseJwtToObject } from 'utils/convertions/convertions-jwt'

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

    //registrar no ssr

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
  isLoggedIn: boolean | null
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
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null)
  const [token, setToken] = useLocalStorage(LocalStorageAuthKeys.TOKEN, '')
  const [nome, setNome] = useLocalStorage(LocalStorageAuthKeys.NOME, '')

  const decodedToken = parseJwtToObject(token)

  const [tipo, setTipo] = useState<string>(
    decodedToken?.roles?.[0]?.toString() || ''
  )

  useEffect(() => {
    if (decodedToken && decodedToken.roles) {
      setTipo(decodedToken.roles[0].toString())
    }
  }, [decodedToken])

  useEffect(() => {
    if (!token) {
      setIsLoggedIn(false)
    } else {
      if (
        !decodedToken ||
        (decodedToken && decodedToken.exp * 1000 < Date.now())
      ) {
        setIsLoggedIn(false)
      } else {
        setIsLoggedIn(true)
      }
    }
  }, [token, setIsLoggedIn])

  const storeSessionDataHandler = (session: SessionData) => {
    setToken(session.token)
    setNome(session.nome)
    setTipo(session.tipo)

    // store in the next session
  }

  const clearSessionDataHandler = () => {
    setToken('')
    setNome('')
    setTipo('')

    //remove from next session
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
        isLoggedIn: isLoggedIn,
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

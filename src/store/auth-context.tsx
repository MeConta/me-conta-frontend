import { useRouter } from 'next/router'
import { destroyCookie, parseCookies, setCookie } from 'nookies'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { IAuthService } from 'services/auth-services/auth-service'
import { ToastType, useToast } from 'services/toast-service/toast-service'
import { DecodedToken } from 'types/data'
import { parseJwtToObject } from 'utils/convertions/convertions-jwt'

const AuthorizationContext = createContext<AuthServiceProps>(
  {} as AuthServiceProps
)

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
  handleLogout: (autoLogout: boolean) => void
}

enum CookieKeys {
  TOKEN = 'token',
  NAME = 'name'
}

export const AuthorizationProvider = (
  props: PropsWithChildren<{ authService: IAuthService }>
) => {
  const isTokenValid = (decodedToken: DecodedToken | null): boolean => {
    if (!decodedToken || !decodedToken.exp) {
      return false
    }
    return decodedToken.exp * 1000 > Date.now()
  }

  const router = useRouter()
  const { emit } = useToast()
  const { [CookieKeys.NAME]: nomeCookie, [CookieKeys.TOKEN]: tokenCookie } =
    parseCookies()
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
    } else {
      setIsLoggedIn(false)
    }
  }, [decodedToken])

  const loginHandler = (session: SessionData) => {
    setNome(session.nome)
    setTipo(session.tipo)
    setCookie(undefined, CookieKeys.TOKEN, session.token)
    setCookie(undefined, CookieKeys.NAME, session.nome)
    setIsLoggedIn(true)
  }

  const logoutHandler = (autoLogout: boolean = false) => {
    destroyCookie(null, CookieKeys.TOKEN)
    destroyCookie(null, CookieKeys.NAME)
    setNome(null)
    setTipo(null)
    setIsLoggedIn(false)

    if (autoLogout) {
      emit({
        type: ToastType.WARNING,
        message: 'Sessão Expirada!',
        autoClose: false
      })
    }
    router.push('/login')
  }

  const session: SessionData = {
    nome: nome || '',
    tipo: tipo || '',
    token: tokenCookie || ''
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

export function useAuthContext(): AuthServiceProps {
  const context = useContext(AuthorizationContext)
  return context
}

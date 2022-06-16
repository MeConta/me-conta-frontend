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
import { ToastType, useToast } from '../services/toast-service/toast-service'
import { DecodedToken } from 'types/data'
import { parseJwtToObject } from '../utils/convertions/convertions-jwt'

const AuthorizationContext = createContext<AuthServiceProps>(
  {} as AuthServiceProps
)

type SessionData = {
  name: string
  type: string
  token: string
  refreshToken: string
  completeProfile: boolean
}

export type AuthServiceProps = {
  authService: IAuthService
  isLoggedIn: boolean
  session: SessionData
  setCompleteProfile: (value: boolean) => void
  handleLogin: (session: SessionData) => void
  handleLogout: (autoLogout?: boolean) => void
}

export enum CookieKeys {
  TOKEN = 'token',
  NAME = 'name',
  REFRESH_TOKEN = 'refresh_token',
  COMPLETE_PROFILE = 'complete_profile'
}

export const booleanToString = (value: boolean) => (value ? 'true' : 'false')
export const stringToBoolean = (value: string) => value === 'true'

export const AuthorizationProvider = (
  props: PropsWithChildren<{ authService: IAuthService }>
) => {
  const isTokenValid = (token: DecodedToken | null): boolean => {
    if (!token || !token.exp) {
      return false
    }
    return token.exp * 1000 > Date.now()
  }

  const router = useRouter()
  const { emit } = useToast()

  const {
    [CookieKeys.NAME]: nomeCookie,
    [CookieKeys.COMPLETE_PROFILE]: completeProfileCookie,
    [CookieKeys.TOKEN]: tokenCookie,
    [CookieKeys.REFRESH_TOKEN]: refreshTokenCookie
  } = parseCookies()
  const decodedToken = parseJwtToObject(tokenCookie)

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    isTokenValid(decodedToken)
  )
  const [completeProfile, setCompletedProfile] = useState<boolean>(false)

  const [name, setName] = useState<string | null>(null)
  const [type, setType] = useState<string | null>(null)

  const cookieOptions = { path: '/' }

  useEffect(() => {
    if (isTokenValid(decodedToken)) {
      setIsLoggedIn(true)
      setName(nomeCookie)
      setCompletedProfile(stringToBoolean(completeProfileCookie))
      setType(decodedToken?.roles?.[0].toString() as string)
    } else {
      setIsLoggedIn(false)
    }
  }, [completeProfileCookie, decodedToken, nomeCookie])

  const loginHandler = (sessionData: SessionData) => {
    setName(sessionData.name)
    setType(sessionData.type.toString())
    setCookie(undefined, CookieKeys.TOKEN, sessionData.token, cookieOptions)
    setCookie(undefined, CookieKeys.NAME, sessionData.name, cookieOptions)
    setCompleteProfile(sessionData.completeProfile)
    setCookie(
      undefined,
      CookieKeys.REFRESH_TOKEN,
      sessionData.refreshToken,
      cookieOptions
    )
    setIsLoggedIn(true)
  }

  const setCompleteProfile = (value: boolean) => {
    setCompletedProfile(value)
    setCookie(
      undefined,
      CookieKeys.COMPLETE_PROFILE,
      booleanToString(value),
      cookieOptions
    )
  }

  const logoutHandler = (autoLogout?: boolean) => {
    destroyCookie(null, CookieKeys.TOKEN, cookieOptions)
    destroyCookie(null, CookieKeys.NAME, cookieOptions)
    destroyCookie(null, CookieKeys.COMPLETE_PROFILE, cookieOptions)
    destroyCookie(null, CookieKeys.REFRESH_TOKEN, cookieOptions)
    setName(null)
    setType(null)
    setIsLoggedIn(false)
    setCompletedProfile(false)

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
    name: name || '',
    type: type || '',
    token: tokenCookie || '',
    refreshToken: refreshTokenCookie || '',
    completeProfile: completeProfile || false
  }

  return (
    <AuthorizationContext.Provider
      value={{
        authService: props.authService,
        isLoggedIn: isLoggedIn,
        setCompleteProfile,
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
  return useContext(AuthorizationContext)
}

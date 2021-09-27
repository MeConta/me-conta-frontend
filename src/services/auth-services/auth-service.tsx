import { createContext, PropsWithChildren } from 'react'

export interface AuthService {
  login(input: { email: string; senha: string }): Promise<void>
}

const AuthorizationContext = createContext<
  { authService: AuthService } | undefined
>(undefined)

const AuthorizationProvider = (
  props: PropsWithChildren<{ authService: AuthService }>
) => {
  return (
    <AuthorizationContext.Provider value={{ authService: props.authService }}>
      {props.children}
    </AuthorizationContext.Provider>
  )
}

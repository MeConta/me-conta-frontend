import { AxiosInstance } from 'axios'
import { createContext, PropsWithChildren, useContext } from 'react'
import { UserType } from '../../enums/user-type.enum'
import { BackendError } from '../../types/backend-error'

export enum SignupError {
  DUPLICATED,
  INTERNAL_ERROR
}
export function getSignupError(error: SignupError): BackendError | undefined {
  switch (error) {
    case SignupError.DUPLICATED:
      return { code: 409, message: 'e-mail duplicado' }
    case SignupError.INTERNAL_ERROR:
      return { code: 500, message: 'erro interno do servidor' }
  }
  return undefined
}

export type SignupUser = {
  nome: string
  email: string
  senha: string
  tipo: UserType
}
export interface ISignupService {
  initialSignup: (
    user: SignupUser
  ) => Promise<{ token: string; refreshToken: string }>
}

export class SignupService implements ISignupService {
  constructor(private readonly service: AxiosInstance) {}
  async initialSignup(user: SignupUser): Promise<{
    token: string
    refreshToken: string
  }> {
    await this.service.post('/cadastro-inicial/', user)
    const response = await this.service.post('/auth/login/', {
      username: user.email,
      password: user.senha
    })
    return {
      token: response.data.token,
      refreshToken: response.data.refreshToken
    }
  }
}

type SignupProps = {
  signupService: ISignupService
}

export const SignupContext = createContext<SignupProps>({} as SignupProps)

export const SignupProvider = (props: PropsWithChildren<SignupProps>) => {
  return (
    <SignupContext.Provider value={{ signupService: props.signupService }}>
      {props.children}
    </SignupContext.Provider>
  )
}

export function useSignup(): SignupProps {
  const context = useContext(SignupContext)
  return context
}

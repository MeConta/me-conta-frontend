import { createContext, PropsWithChildren, useContext } from 'react'
import { BackendError } from '../../types/backend-error'
import { UserType } from '../../enums/user-type.enum'
import { AxiosStatic } from 'axios'

export enum SignupError {
  DUPLICATED
}
export function getSignupError(error: SignupError): BackendError | undefined {
  switch (error) {
    case SignupError.DUPLICATED:
      return { code: 409, message: 'e-mail duplicado' }
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
  initialSignup: (user: SignupUser) => void
}

export class SignupService implements ISignupService {
  constructor(private readonly service: AxiosStatic) {}
  async initialSignup(user: SignupUser) {
    await this.service.post(
      `${process.env.NEXT_PUBLIC_API_URL}/cadastro-inicial/` || '',
      user
    )
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

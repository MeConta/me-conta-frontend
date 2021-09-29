import { createContext, PropsWithChildren } from 'react'
import axios from 'axios'
import { BackendError } from '../../types/backend-error'
import { UserType } from '../../enums/user-type.enum'

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
  name: string
  email: string
  password: string
  tipo: UserType
}
export interface ISignupService {
  initialSignup: (user: SignupUser) => void
}

export class SignupService implements ISignupService {
  async initialSignup(user: SignupUser) {
    // throw new SignupError('duplicado', 'mensagem do back')
    //throw getSignupError(SignupError.DUPLICATED)

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user` || '', user)
  }
}

type SignupProviderProps = {
  signupService: ISignupService
}

export const SignupContext = createContext<SignupProviderProps>(
  {} as SignupProviderProps
)

export const SignupProvider = (
  props: PropsWithChildren<SignupProviderProps>
) => {
  return (
    <SignupContext.Provider value={{ signupService: props.signupService }}>
      {props.children}
    </SignupContext.Provider>
  )
}

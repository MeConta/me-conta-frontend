import { createContext, PropsWithChildren } from 'react'
import axios from 'axios'

export type SignupUser = {
  email: string
  password: string
  tipo: string
}
export interface ISignupService {
  initialSignup: (user: SignupUser) => void
}

export class SignupService implements ISignupService {
  async initialSignup(user: SignupUser) {
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

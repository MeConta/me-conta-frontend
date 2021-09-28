import { createContext, PropsWithChildren } from 'react'

export type SignupUser = {
  email: string
  password: string
  tipo: string
}
export interface ISignupService {
  initialSignup: (user: SignupUser) => void
}

export class SignupService implements ISignupService {
  initialSignup(user: SignupUser) {
    console.log(user)
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

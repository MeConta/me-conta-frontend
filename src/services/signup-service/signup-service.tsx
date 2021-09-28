export type SignupUser = {
  email: string
  password: string
  tipo: string
}
export interface SignupService {
  initialSignup: (user: SignupUser) => void
}

import { UserType } from 'enums/user-type.enum'

const redirects: { [key: number]: string } = {
  [UserType.ALUNO]: '/dashboard-aluno',
  [UserType.ATENDENTE]: '/dashboard-atendente',
  [UserType.SUPERVISOR]: '/dashboard-supervisor',
  [UserType.ADMINISTRADOR]: '/dashboard-administrador'
}

export { redirects }

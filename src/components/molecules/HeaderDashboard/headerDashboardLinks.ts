import { UserType } from '../../../enums/user-type.enum'

type Links = { label: string; href: string }[]

const adminLinks: Links = [
  { label: 'Voluntarios', href: '/voluntarios' },
  { label: 'Alunos', href: '/alunos' },
  { label: 'Meu perfil', href: '/meu-perfil' }
]

const atendenteLinks: Links = [
  { label: 'Agenda', href: '/agenda' },
  { label: 'Meus horários', href: '/meus-horarios' },
  { label: 'Meu perfil', href: '/meu-perfil' }
]

const alunoLinks: Links = [
  { label: 'Agenda', href: '/agenda' },
  { label: 'Meu perfil', href: '/meu-perfil' }
]

const supervisorLinks: Links = [{ label: 'Meu perfil', href: '/meu-perfil' }]

export const headerDashboardLinks: { [key: string]: Links } = {
  [UserType.ALUNO]: alunoLinks,
  [UserType.ATENDENTE]: atendenteLinks,
  [UserType.SUPERVISOR]: supervisorLinks,
  [UserType.ADMINISTRADOR]: adminLinks
}

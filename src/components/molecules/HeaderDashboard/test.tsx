import { render, screen } from 'utils/tests/helpers'
import HeaderDashboard from '.'
import { useAuthService } from '../../../services/auth-services/auth-service'

jest.mock('services/auth-services/auth-service')

describe('<HeaderDashboard />', () => {
  beforeEach(() => {
    // @ts-ignore
    useAuthService.mockImplementation(() => ({
      isLoggedIn: true,
      session: {
        nome: 'John Doe',
        tipo: '0'
      }
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('deve mostrar a logo do meconta', () => {
    render(<HeaderDashboard logoSrc="/mock-image.png" />)

    expect(
      screen.getByRole('img', { name: 'Logo Me Conta' })
    ).toBeInTheDocument()
  })

  it('não deve mostrar links quando não conectado', () => {
    // @ts-ignore
    useAuthService.mockImplementation(() => ({
      isLoggedIn: false,
      session: {
        nome: 'John Doe',
        tipo: '0'
      }
    }))

    render(<HeaderDashboard logoSrc="/mock-image.png" />)

    expect(screen.queryByText('Meu perfil')).toBeNull()
    expect(screen.getByRole('button', { name: 'Acesso' })).toBeInTheDocument()
  })

  it('deve renderizar os links do aluno', () => {
    render(<HeaderDashboard logoSrc="/mock-image.png" />)

    expect(screen.getByRole('link', { name: 'Agenda' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Meu perfil' })).toBeInTheDocument()
    expect(screen.queryByText('Meus horários')).toBeNull()
  })

  it('deve renderizar os links do atendente', () => {
    // @ts-ignore
    useAuthService.mockImplementation(() => ({
      isLoggedIn: true,
      session: {
        nome: 'John Doe',
        tipo: '2'
      }
    }))

    render(<HeaderDashboard logoSrc="/mock-image.png" />)

    expect(screen.getByRole('link', { name: 'Agenda' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Meu perfil' })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Meus horários' })
    ).toBeInTheDocument()
  })

  it('deve renderizar os links do administrador', () => {
    // @ts-ignore
    useAuthService.mockImplementation(() => ({
      isLoggedIn: true,
      session: {
        nome: 'John Doe',
        tipo: '3'
      }
    }))

    render(<HeaderDashboard logoSrc="/mock-image.png" />)

    expect(
      screen.getByRole('link', { name: 'Voluntarios' })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Meu perfil' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Alunos' })).toBeInTheDocument()
  })

  it('deve renderizar os links do supervisor', () => {
    // @ts-ignore
    useAuthService.mockImplementation(() => ({
      isLoggedIn: true,
      session: {
        nome: 'John Doe',
        tipo: '1'
      }
    }))

    render(<HeaderDashboard logoSrc="/mock-image.png" />)

    expect(screen.queryByText('Agenda')).toBeNull()
    expect(screen.getByRole('link', { name: 'Meu perfil' })).toBeInTheDocument()
  })

  it('deve renderizar o nome do usuário', () => {
    render(<HeaderDashboard logoSrc="/mock-image.png" />)

    expect(screen.getByText('Olá,')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('deve renderizar o botao para fazer logout', () => {
    render(<HeaderDashboard logoSrc="/mock-image.png" />)

    expect(screen.getByText('Sair').closest('button')).toBeInTheDocument()
  })
})

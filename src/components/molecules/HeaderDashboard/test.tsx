import { useAuthContext } from 'store/auth-context'
import { render, screen } from 'utils/tests/helpers'
import HeaderDashboard from '.'

jest.mock('../../../store/auth-context')

describe('<HeaderDashboard />', () => {
  beforeEach(() => {
    // @ts-ignore
    useAuthContext.mockImplementation(() => ({
      isLoggedIn: true,
      session: {
        name: 'John Doe',
        type: '0'
      }
    }))
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should show MeConta logo', () => {
    render(<HeaderDashboard logoSrc="/mock-image.png" />)

    expect(
      screen.getByRole('img', { name: 'Logo Me Conta' })
    ).toBeInTheDocument()
  })

  it('should not show links when is not connected', () => {
    // @ts-ignore
    useAuthContext.mockImplementation(() => ({
      isLoggedIn: false,
      session: {
        name: 'John Doe',
        type: '0'
      }
    }))

    render(<HeaderDashboard logoSrc="/mock-image.png" />)

    expect(screen.queryByText('Meu perfil')).toBeNull()
    expect(screen.getByRole('button', { name: 'Acessar' })).toBeInTheDocument()
  })

  it('should render student links', () => {
    render(<HeaderDashboard logoSrc="/mock-image.png" />)

    expect(screen.getByRole('link', { name: 'Agenda' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Meu perfil' })).toBeInTheDocument()
    expect(screen.queryByText('Meus horários')).toBeNull()
  })

  it('should render volunteer links', () => {
    // @ts-ignore
    useAuthContext.mockImplementation(() => ({
      isLoggedIn: true,
      session: {
        name: 'John Doe',
        type: '2'
      }
    }))

    render(<HeaderDashboard logoSrc="/mock-image.png" />)

    expect(screen.getByRole('link', { name: 'Agenda' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Meu perfil' })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Meus horários' })
    ).toBeInTheDocument()
  })

  it('should render administrator links', () => {
    // @ts-ignore
    useAuthContext.mockImplementation(() => ({
      isLoggedIn: true,
      session: {
        name: 'John Doe',
        type: '3'
      }
    }))

    render(<HeaderDashboard logoSrc="/mock-image.png" />)

    expect(
      screen.getByRole('link', { name: 'Voluntarios' })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Meu perfil' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Alunos' })).toBeInTheDocument()
  })

  it('should render supervisor links', () => {
    // @ts-ignore
    useAuthContext.mockImplementation(() => ({
      isLoggedIn: true,
      session: {
        name: 'John Doe',
        type: '1'
      }
    }))

    render(<HeaderDashboard logoSrc="/mock-image.png" />)

    expect(screen.queryByText('Agenda')).toBeNull()
    expect(screen.getByRole('link', { name: 'Meu perfil' })).toBeInTheDocument()
  })

  it('should render the user name', () => {
    render(<HeaderDashboard logoSrc="/mock-image.png" />)

    expect(screen.getByText('Olá,')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })

  it('should render the logout button when the user is logged in', () => {
    render(<HeaderDashboard logoSrc="/mock-image.png" />)

    expect(screen.getByText('Sair').closest('button')).toBeInTheDocument()
  })
})

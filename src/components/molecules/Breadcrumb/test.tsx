import { render, screen } from '../../../utils/tests/helpers'
import Breadcrumb from './index'

jest.mock('../../../services/auth-services/auth-service', () => {
  const useAuthService = () => {
    return {
      isLoggedIn: true,
      session: {
        nome: 'John Doe'
      }
    }
  }
  return { useAuthService }
})

jest.mock('next/router', () => ({
  useRouter: () => ({
    asPath: '/dashboard/meu-perfil'
  })
}))

describe('<Breadcrumb />', () => {
  beforeEach(() => {
    render(<Breadcrumb />)
  })

  it('should render the title', () => {
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument()
    expect(screen.getByText('dashboard')).toBeInTheDocument()
  })

  it('should render the links', () => {
    expect(screen.getByRole('link', { name: 'meu perfil' })).toBeInTheDocument()
  })
})

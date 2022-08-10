import { render, screen } from '../../utils/tests/helpers'
import * as AuthorizationContext from '../../store/auth-context'
import createAuthContextObject from '../../utils/tests/createAuthContextObject'
import TestPage, {
  AtendenteAuthenticatedRoute
} from '../../utils/tests/AuthenticatedTestPage'
import { UserType } from 'enums/user-type.enum'

jest.mock('store/auth-context')
const mockRouter = jest.fn()
const mockPathName = jest.fn()
jest.mock('next/router', () => ({
  useRouter: () => ({ push: mockRouter, pathname: mockPathName })
}))

describe('authenticationRoute', () => {
  it('should redirect to login page if the user is not logged in', () => {
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(createAuthContextObject())

    render(<TestPage />)

    expect(screen.queryByText('Página Padrão')).not.toBeInTheDocument()
    expect(
      AuthorizationContext.useAuthContext().handleLogout
    ).toHaveBeenCalled()
  })

  it('should render the page if the user is logged in, is authorized and has a complete profile', () => {
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(
        createAuthContextObject(true, String(UserType.ALUNO), true)
      )

    render(<TestPage />)

    expect(screen.queryByText('Página Padrão')).toBeInTheDocument()
  })

  it('should redirect to criar conta page if the user is logged in with an incomplete profile', () => {
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(
        createAuthContextObject(true, String(UserType.ALUNO), false)
      )

    render(<TestPage />)

    expect(screen.queryByText('Página Padrão')).not.toBeInTheDocument()
    expect(mockRouter).toHaveBeenCalledWith('/criar-conta')
  })

  it('should redirect to dashboard atendente page if the user is logged in with an complete profile and is an Atendente', () => {
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(
        createAuthContextObject(true, String(UserType.ATENDENTE), true)
      )

    render(<TestPage />)

    expect(screen.queryByText('Página Padrão')).not.toBeInTheDocument()
    expect(mockRouter).toHaveBeenLastCalledWith('/dashboard-atendente')
  })

  it('should redirect to dashboard atendente page if the user has permissaoNavegar false and is atendente type', () => {
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(
        createAuthContextObject(true, String(UserType.ATENDENTE), true, false)
      )

    render(<AtendenteAuthenticatedRoute />)

    expect(screen.queryByText('Página Padrão')).not.toBeInTheDocument()
    expect(mockRouter).toHaveBeenLastCalledWith('/dashboard-atendente')
  })

  it('should render dashboard atendente page when user has permissaoNavegar true and is atendente type', () => {
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(
        createAuthContextObject(true, String(UserType.ATENDENTE), true, true)
      )

    render(<AtendenteAuthenticatedRoute />)

    expect(screen.queryByText('Página Padrão')).toBeInTheDocument()
  })

  it.skip('should render dashboard atendente page when user has permissaoNavegar true and is atendente type', () => {
    jest.clearAllMocks()
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(
        createAuthContextObject(true, String(UserType.ATENDENTE), true, false)
      )
    jest.mock('next/router', () => ({
      useRouter: () => ({ push: mockRouter, pathname: '/dashboard-atendente' })
    }))

    render(<AtendenteAuthenticatedRoute />)

    expect(mockRouter).toBeCalledTimes(0)
  })
})

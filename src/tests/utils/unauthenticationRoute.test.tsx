import { render, screen } from '../../utils/tests/helpers'
import * as AuthorizationContext from '../../store/auth-context'
import createAuthContextObject from '../../utils/tests/createAuthContextObject'
import TestPage from '../../utils/tests/UnauthenticatedTestPage'
import { UserType } from 'enums/user-type.enum'

jest.mock('store/auth-context')
const mockRouter = jest.fn()
jest.mock('next/router', () => ({
  useRouter: () => ({ push: mockRouter })
}))

describe('unauthenticationRoute', () => {
  it('should render the page if the user is not logged in', () => {
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(createAuthContextObject())

    render(<TestPage />)

    expect(screen.queryByText('Página Padrão')).toBeInTheDocument()
  })

  it('should redirect to dashboard page he user is logged in, is authorized and has a complete profile', () => {
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(
        createAuthContextObject(true, String(UserType.ALUNO), true)
      )

    render(<TestPage />)

    expect(screen.queryByText('Página Padrão')).not.toBeInTheDocument()
    expect(mockRouter).toHaveBeenCalledWith('/dashboard-aluno')
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
})

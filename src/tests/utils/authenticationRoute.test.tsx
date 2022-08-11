import { render, screen } from '../../utils/tests/helpers'
import * as AuthorizationContext from '../../store/auth-context'
import createAuthContextObject from '../../utils/tests/createAuthContextObject'
import TestPage, {
  AtendenteAuthenticatedRoute
} from '../../utils/tests/AuthenticatedTestPage'
import { UserType } from 'enums/user-type.enum'
import * as React from 'react'

jest.mock('store/auth-context')
const mockRouterPush = jest.fn()
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: ''
    }
  }
}))
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn()
}))

describe('authenticationRoute', () => {
  let useRouter: jest.SpyInstance<any, unknown[]>
  const setState = jest.fn()
  const useStateMock: any = () => [false, setState]

  beforeEach(async () => {
    jest.clearAllMocks()
    jest.spyOn(React, 'useState').mockImplementation(useStateMock)
    useRouter = jest.spyOn(require('next/router'), 'useRouter')
    useRouter.mockImplementation(() => ({
      pathname: '',
      push: mockRouterPush
    }))
  })

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
    jest.spyOn(React, 'useState').mockImplementation(() => [true, setState])
    render(<TestPage />)

    expect(setState).toHaveBeenCalledWith(true)
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
    expect(mockRouterPush).toHaveBeenCalledWith('/criar-conta')
  })

  it('should redirect to dashboard atendente page if the user is logged in with an complete profile and is an Atendente', () => {
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(
        createAuthContextObject(true, String(UserType.ATENDENTE), true)
      )

    render(<TestPage />)

    expect(screen.queryByText('Página Padrão')).not.toBeInTheDocument()
    expect(mockRouterPush).toHaveBeenLastCalledWith('/dashboard-atendente')
  })

  it('should redirect to dashboard atendente page if the user has permissaoNavegar false and is atendente type', () => {
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(
        createAuthContextObject(true, String(UserType.ATENDENTE), true, false)
      )

    render(<AtendenteAuthenticatedRoute />)

    expect(screen.queryByText('Página Padrão')).not.toBeInTheDocument()
    expect(mockRouterPush).toHaveBeenLastCalledWith('/dashboard-atendente')
  })

  it('should render dashboard atendente page when user has permissaoNavegar true and is atendente type', () => {
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(
        createAuthContextObject(true, String(UserType.ATENDENTE), true, true)
      )

    jest.spyOn(React, 'useState').mockImplementation(() => [true, setState])

    render(<AtendenteAuthenticatedRoute />)

    expect(setState).toHaveBeenCalledTimes(1)
    expect(setState).toHaveBeenCalledWith(true)
    expect(screen.queryByText('Página Padrão')).toBeInTheDocument()
  })

  it('should render dashboard atendente page when user has permissaoNavegar false and is atendente type', () => {
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(
        createAuthContextObject(true, String(UserType.ATENDENTE), true, false)
      )
    jest.spyOn(React, 'useState').mockImplementation(useStateMock)
    useRouter.mockImplementation(() => ({
      pathname: '/dashboard-atendente',
      push: mockRouterPush
    }))
    render(<AtendenteAuthenticatedRoute />)

    expect(setState).toHaveBeenCalledTimes(1)
    expect(setState).toHaveBeenCalledWith(true)
    expect(mockRouterPush).toBeCalledTimes(0)
  })

  it('should call router push when user is atendent and permissaoNavegar is false and pathname router is diferent /dashboard-atendente', () => {
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(
        createAuthContextObject(true, String(UserType.ATENDENTE), true, false)
      )
    useRouter.mockImplementation(() => ({
      pathname: '/any-router',
      push: mockRouterPush
    }))
    render(<AtendenteAuthenticatedRoute />)

    expect(setState).toHaveBeenCalledTimes(0)
    expect(mockRouterPush).toBeCalledTimes(1)
  })
})

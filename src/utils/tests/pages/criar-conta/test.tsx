import { render, screen } from '../../helpers'
import CriarConta from '../../../../pages/criar-conta/index'
import React from 'react'
import * as AuthorizationContext from '../../../../store/auth-context'

const createAuthContextObject = (
  isLoggedIn: boolean = false,
  userType: string = '0',
  completeProfile: boolean = false
) => {
  return {
    isLoggedIn,
    authService: { validarHash: jest.fn(), logout: jest.fn() },
    session: {
      name: 'teste',
      type: userType,
      completeProfile,
      token: '',
      refreshToken: ''
    },
    handleLogin: jest.fn(),
    handleLogout: jest.fn()
  }
}

jest.mock('store/auth-context')

jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn() })
}))

jest.mock('services/toast-service/toast-service', () => {
  const useToast = () => {
    return { emit: jest.fn() }
  }
  return { useToast, ToastType: { SUCCESS: 'sucesso' } }
})

describe('criar conta page', () => {
  it('should render page with Criar Conta form when the user is not logged in', async () => {
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(createAuthContextObject())

    render(<CriarConta />)

    expect(screen.getByText(/Criar Conta/)).toBeInTheDocument()
  })

  it('when user is logged in and has not completed registration, should render Dados Pessoais form', async () => {
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(createAuthContextObject(true, '0', false))

    render(<CriarConta />)

    expect((await screen.findByText(/Complete seus/i)).textContent).toEqual(
      'Complete seus Dados Pessoais'
    )
  })

  it('should show Dados Escolares on NavigationLocation when user is an Aluno', () => {
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(createAuthContextObject(true, '0', false))

    render(<CriarConta />)

    expect(screen.getByText(/Dados Escolares/i)).toBeInTheDocument()
  })

  it('should show Dados Acadêmicos on NavigationLocation when user is an Atendente', async () => {
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(createAuthContextObject(true, '2', false))

    render(<CriarConta />)
    expect(await screen.findByText(/Dados Acadêmicos/i)).toBeInTheDocument()
  })
})

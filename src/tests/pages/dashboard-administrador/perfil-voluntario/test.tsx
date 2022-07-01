import { UserType } from 'enums/user-type.enum'
import PerfilVoluntario from 'pages/dashboard-administrador/perfil-voluntario/[id]'
import React from 'react'
import createAuthContextObject from 'utils/tests/createAuthContextObject'
import { act, render, screen } from 'utils/tests/helpers'
import * as AuthorizationContext from '../../../../store/auth-context'
import userEvent from '@testing-library/user-event'
import router from 'next/router'
import theme from 'styles/theme'

jest.mock('store/auth-context')

jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn() }),
  push: jest.fn()
}))

describe('when in volunteer profile page', () => {
  beforeEach(async () => {
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(
        createAuthContextObject(true, UserType.ADMINISTRADOR.toString(), true)
      )
    await act(async () => {
      render(<PerfilVoluntario />)
    })
  })

  it('should render title Perfil Voluntário', () => {
    expect(screen.getByText(/Perfil - Voluntário/)).toBeInTheDocument()
  })

  it('should render button link to return to admin Dashboard', () => {
    expect(
      screen.getByRole('button', { name: /Voltar ao Dashboard/ })
    ).toBeInTheDocument()
  })

  it('should redirect to dashboard admin when click in Voltar ao Dashboard', () => {
    userEvent.click(screen.getByRole('button', { name: /Voltar ao Dashboard/ }))

    expect(router.push).toHaveBeenCalledWith('/dashboard-administrador')
  })

  it.skip('should render input title for Perfil Voluntário container', () => {
    expect(screen.getByLabelText(/Link das Sessões/)).toBeInTheDocument()
  })

  it('should render Aprovar button', () => {
    const aprovarButton = screen.getByRole('button', { name: /APROVAR/ })
    expect(aprovarButton).toBeInTheDocument()
    expect(aprovarButton).toHaveStyle(
      `background-color: ${theme.colors.darkPastelGreen}`
    )
  })
})

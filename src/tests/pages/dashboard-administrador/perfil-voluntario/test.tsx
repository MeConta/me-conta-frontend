import { UserType } from 'enums/user-type.enum'
import PerfilVoluntario from 'pages/dashboard-administrador/perfil-voluntario/[id]'
import React from 'react'
import createAuthContextObject from 'utils/tests/createAuthContextObject'
import { act, render, screen } from 'utils/tests/helpers'
import * as AuthorizationContext from '../../../../store/auth-context'

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

    act(() => {
      render(<PerfilVoluntario />)
    })
  })

  it('should render title Perfil Voluntário', () => {
    expect(screen.getByText(/Perfil - Voluntário/)).toBeInTheDocument()
  })

  it.skip('should render input title for Perfil Voluntário container', () => {
    expect(screen.getByLabelText(/Link das Sessões/)).toBeInTheDocument()
  })
})

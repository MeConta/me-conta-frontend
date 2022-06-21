import { render, screen } from '../../../utils/tests/helpers'
import React from 'react'
import * as AuthorizationContext from '../../../store/auth-context'
import createAuthContextObject from '../../../utils/tests/createAuthContextObject'
import DashboardAdministrador from 'pages/dashboard-administrador'
import { UserType } from 'enums/user-type.enum'

jest.mock('store/auth-context')

jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn() })
}))

const filters = ['Em aberto', 'Aprovados', 'Reprovados', 'Todos']

describe('dashboard administrador page', () => {
  for (let i = 0; i < filters.length; i++) {
    it(`should render page with button ${filters[i]}`, async () => {
      jest
        .spyOn(AuthorizationContext, 'useAuthContext')
        .mockReturnValue(
          createAuthContextObject(true, String(UserType.ADMINISTRADOR), true)
        )

      render(<DashboardAdministrador />)

      expect(
        screen.getByRole('button', { name: filters[i] })
      ).toBeInTheDocument()
    })
  }
})

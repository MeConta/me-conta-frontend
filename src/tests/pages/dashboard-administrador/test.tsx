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

jest.mock('services/toast-service/toast-service', () => {
  const useToast = () => {
    return { emit: jest.fn() }
  }
  return { useToast, ToastType: { SUCCESS: 'sucesso' } }
})

const filters = ['Em aberto', 'Aprovados', 'Reprovados', 'Todos']

describe('dashboard administrador page', () => {
  it('should render title Lista de Voluntários', async () => {
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(
        createAuthContextObject(true, UserType.ADMINISTRADOR.toString(), true)
      )

    render(<DashboardAdministrador />)

    expect(screen.getByText(/Lista de Voluntários/)).toBeInTheDocument()
  })

  for (const filter of filters) {
    it(`should render page with button ${filter}`, async () => {
      jest
        .spyOn(AuthorizationContext, 'useAuthContext')
        .mockReturnValue(
          createAuthContextObject(true, String(UserType.ADMINISTRADOR), true)
        )

      render(<DashboardAdministrador />)

      expect(screen.getByRole('button', { name: filter })).toBeInTheDocument()
    })
  }
  it.skip(`should call endpoint to get volunteers by status when a filter button is clicked`, async () => {
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(
        createAuthContextObject(true, String(UserType.ADMINISTRADOR), true)
      )

    render(<DashboardAdministrador />)

    //expect(volunteerServiceMock.findByApprovalStatus).toHaveBeenCalledWith()
  })
})

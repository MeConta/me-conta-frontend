import { act, render, screen, waitFor } from '../../../utils/tests/helpers'
import React from 'react'
import * as AuthorizationContext from '../../../store/auth-context'
import createAuthContextObject from '../../../utils/tests/createAuthContextObject'
import DashboardAdministrador from 'pages/dashboard-administrador'
import { UserType } from 'enums/user-type.enum'
import userEvent from '@testing-library/user-event'
import { api } from 'services/api/api'
import { StatusAprovacao } from 'enums/volunteer-status.enum'

jest.mock('store/auth-context')

jest.mock('services/api/api', () => ({
  api: {
    get: jest.fn(() => ({
      data: []
    }))
  }
}))

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
  beforeEach(() => {
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(
        createAuthContextObject(true, UserType.ADMINISTRADOR.toString(), true)
      )

    act(() => {
      render(<DashboardAdministrador />)
    })
  })

  it('should render title Lista de Voluntários', () => {
    expect(screen.getByText(/Lista de Voluntários/)).toBeInTheDocument()
  })

  for (const filter of filters) {
    it(`should render page with button ${filter}`, () => {
      expect(screen.getByRole('button', { name: filter })).toBeInTheDocument()
    })
  }
  it(`should call endpoint to get volunteers by status when a filter button is clicked`, async () => {
    act(() => {
      userEvent.click(screen.getByRole('button', { name: 'Aprovados' }))
    })

    await waitFor(() => {
      expect(api.get).toHaveBeenLastCalledWith(
        `/voluntarios/listar/2?status=${StatusAprovacao.APROVADO}`
      )
    })
  })
})

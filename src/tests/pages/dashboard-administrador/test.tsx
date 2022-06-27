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
      data: [
        {
          aprovado: null,
          usuario: {
            nome: 'Maria Silva',
            id: 1,
            frente: [0, 1, 2]
          }
        },
        {
          aprovado: null,
          usuario: {
            nome: 'João Souza',
            id: 2,
            frente: [0, 1]
          }
        }
      ]
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

  it(`should render a table listing the volunteers with Status, Nome and Tipo`, async () => {
    act(() => {
      userEvent.click(screen.getByRole('button', { name: 'Em aberto' }))
    })

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Nome')).toBeInTheDocument()
    expect(screen.getByText('Tipo')).toBeInTheDocument()
    expect(screen.getByText(/Maria Silva/)).toBeInTheDocument()
    expect(screen.getByText(/João Souza/)).toBeInTheDocument()
    expect(screen.getAllByText('Aberto')).toHaveLength(2)
  })
})

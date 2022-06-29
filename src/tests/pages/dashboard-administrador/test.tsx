import {
  act,
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '../../../utils/tests/helpers'
import React from 'react'
import * as AuthorizationContext from '../../../store/auth-context'
import createAuthContextObject from '../../../utils/tests/createAuthContextObject'
import DashboardAdministrador from 'pages/dashboard-administrador'
import { UserType } from 'enums/user-type.enum'
import userEvent from '@testing-library/user-event'
import { api } from 'services/api/api'
import { StatusAprovacao } from 'enums/volunteer-status.enum'
import router from 'next/router'
import Acolhimento from '../../public/assets/volunteer/services/acolhimentoIcon.png'
import CoachingEstudos from '../../public/assets/volunteer/services/coachingEstudosIcon.png'
import OrientacaoVocacional from '../../public/assets/volunteer/services/orientacaoVocacionalIcon.png'

jest.mock('store/auth-context')

const icons = [Acolhimento, CoachingEstudos, OrientacaoVocacional]

const volunteersData = [
  {
    aprovado: null,
    usuario: {
      nome: 'Maria Silva',
      id: 1
    },
    frentes: [0, 1, 2]
  },
  {
    aprovado: false,
    usuario: {
      nome: 'João Souza',
      id: 2
    },
    frentes: [0, 1]
  },
  {
    aprovado: true,
    usuario: {
      nome: 'Bia Barboza',
      id: 3
    },
    frentes: [0, 2]
  }
]

jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn() }),
  push: jest.fn()
}))

jest.mock('services/toast-service/toast-service', () => {
  const useToast = () => {
    return { emit: jest.fn() }
  }
  return { useToast, ToastType: { SUCCESS: 'sucesso' } }
})

const statusLabels = [
  ['Em aberto', 'em aberto'],
  ['Aprovados', 'aprovado'],
  ['Reprovados', 'reprovado'],
  ['Todos', 'cadastrado']
]

const getByRoleAndName = (role: string, name: string) =>
  screen.getByRole(role, { name })

describe('dashboard administrador page', () => {
  beforeEach(async () => {
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(
        createAuthContextObject(true, UserType.ADMINISTRADOR.toString(), true)
      )
    jest.spyOn(api, 'get').mockResolvedValue({ data: volunteersData })

    await act(async () => {
      render(<DashboardAdministrador />)
    })

    await waitForElementToBeRemoved(screen.getByTestId('loader'))
  })

  it('should render title Lista de Voluntários', () => {
    expect(screen.getByText(/Lista de Voluntários/)).toBeInTheDocument()
  })

  it.each(statusLabels)(
    `should render page with filter button %p`,
    (status) => {
      expect(screen.getByRole('button', { name: status })).toBeInTheDocument()
    }
  )

  it(`should call endpoint to get volunteers by status when a filter button is clicked`, async () => {
    await act(async () => {
      userEvent.click(screen.getByRole('button', { name: 'Aprovados' }))
    })

    await waitFor(() => {
      expect(api.get).toHaveBeenLastCalledWith(
        `/voluntarios/listar/2?status=${StatusAprovacao.APROVADO}`
      )
    })
  })

  it(`should render a table with headers (Status, Nome and Tipo)`, async () => {
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(getByRoleAndName('columnheader', 'Status')).toBeInTheDocument()
    expect(getByRoleAndName('columnheader', 'Nome')).toBeInTheDocument()
    expect(getByRoleAndName('columnheader', 'Tipo')).toBeInTheDocument()
    expect(getByRoleAndName('columnheader', '')).toBeInTheDocument()
  })

  it(`should render a table with volunteers rows information`, async () => {
    expect(screen.getByText(volunteersData[0].usuario.nome)).toBeInTheDocument()
    expect(getByRoleAndName('cell', 'Aberto')).toBeInTheDocument()
    expect(getByRoleAndName('cell', 'Reprovado')).toBeInTheDocument()
    expect(getByRoleAndName('cell', 'Aprovado')).toBeInTheDocument()
    expect(screen.getAllByRole('button', { name: 'Ver Perfil' })).toHaveLength(
      3
    )
  })

  it('should redirect to volunteers profile page when clicked on the button Ver Perfil', () => {
    userEvent.click(screen.getAllByRole('button', { name: 'Ver Perfil' })[0])

    expect(router.push).toHaveBeenCalledWith(
      '/dashboard-administrador/perfil-voluntario/1'
    )
  })

  it.each(statusLabels)(
    'should show message instead of table if there are no volunteers with %p status in the list',
    async (status, statusLabel) => {
      jest.spyOn(api, 'get').mockResolvedValueOnce({ data: [] })

      userEvent.click(getByRoleAndName('button', status))

      expect(
        await screen.findByText(`Nenhum voluntário ${statusLabel} no momento.`)
      ).toBeInTheDocument()

      expect(screen.queryByRole('table')).not.toBeInTheDocument()
    }
  )

  it('should show loader while data is being required', async () => {
    act(() => {
      userEvent.click(getByRoleAndName('button', 'Aprovados'))
    })

    expect(screen.getByTestId('loader')).toBeInTheDocument()

    expect(await screen.findByRole('table')).toBeInTheDocument()
  })

  it("should render the icons of voluteer's service (acolhimentoIcon.png, orientacaoVocacionalIcon.png, coachingEstudosIcon.png)", async () => {
    await waitFor(async () => {
      const firstRow = (
        await screen.findAllByRole('row')
      )[1] as HTMLTableRowElement
      const images = await within(firstRow.cells[2]).findAllByRole('img')

      expect(images).toHaveLength(3)
      expect(images[0]).toHaveAttribute('src', icons[0].src)
      expect(images[1]).toHaveAttribute('src', icons[1].src)
      expect(images[2]).toHaveAttribute('src', icons[2].src)
    })
  })
})

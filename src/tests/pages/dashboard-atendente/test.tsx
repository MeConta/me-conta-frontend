import { act, render, screen } from '../../../utils/tests/helpers'
import React from 'react'
import * as AuthorizationContext from '../../../store/auth-context'
import createAuthContextObject from '../../../utils/tests/createAuthContextObject'
import { UserType } from 'enums/user-type.enum'
import VolunteerDashboard from 'pages/dashboard-atendente'
import userEvent from '@testing-library/user-event'
import router from 'next/router'
import DashboardAtendente from 'pages/dashboard-atendente'

jest.mock('store/auth-context')

jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn() }),
  push: jest.fn()
}))

async function applyTestSetup(shouldAwait: boolean = true) {
  jest.clearAllMocks()

  jest
    .spyOn(AuthorizationContext, 'useAuthContext')
    .mockReturnValue(
      createAuthContextObject(true, UserType.ATENDENTE.toString(), true)
    )

  let container = null

  if (shouldAwait) {
    await act(async () => {
      container = render(<DashboardAtendente />).container
    })
  } else {
    container = render(<DashboardAtendente />).container
  }

  return container
}

describe('Page Loader', () => {
  it('should render loader while data is being fetched', async () => {
    await applyTestSetup(false)

    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })
})

describe('Atendente page', () => {
  beforeEach(async () => {
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(
        createAuthContextObject(true, UserType.ATENDENTE.toString(), true)
      )

    await act(async () => {
      render(<VolunteerDashboard />)
    })
  })

  it('should render title meus horários disponíveis', () => {
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Meus horários disponíveis na semana/
      })
    ).toBeInTheDocument()
  })

  it('should render button gerenciar horários', () => {
    expect(
      screen.getByRole('button', { name: /GERENCIAR HORÁRIOS/ })
    ).toBeInTheDocument()
  })

  it('should redirect to atendente/meus-horarios', () => {
    const button = screen.getByRole('button', { name: /GERENCIAR HORÁRIOS/ })
    userEvent.click(button)
    expect(router.push).toHaveBeenCalledWith('/atendente/meus-horarios')
  })
})

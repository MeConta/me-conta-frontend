import { act, render, screen, waitFor } from '../../../utils/tests/helpers'
import React from 'react'
import * as AuthorizationContext from '../../../store/auth-context'
import createAuthContextObject from '../../../utils/tests/createAuthContextObject'
import { UserType } from 'enums/user-type.enum'
import VolunteerDashboard from 'pages/dashboard-atendente'
import userEvent from '@testing-library/user-event'
import router from 'next/router'

jest.mock('store/auth-context')

jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn() }),
  push: jest.fn()
}))

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

  it.skip('should redirect to atendente/meus-horarios', () => {
    // const button = screen.getByRole('button', { name: /GERENCIAR HORÁRIOS/ })
    // userEvent.click(button)

    userEvent.click(screen.getByRole('button', { name: /GERENCIAR HORÁRIOS/ }))

    expect(router.push).toHaveBeenCalledWith('/atendente/meus-horarios')
  })
})

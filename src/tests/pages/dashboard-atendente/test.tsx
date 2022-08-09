import '../../../utils/tests/matchMedia.mock'
import { act, render, screen } from '../../../utils/tests/helpers'
import React from 'react'
import * as AuthorizationContext from '../../../store/auth-context'
import createAuthContextObject from '../../../utils/tests/createAuthContextObject'
import { UserType } from 'enums/user-type.enum'
import VolunteerDashboard from 'pages/dashboard-atendente'
import userEvent from '@testing-library/user-event'
import router from 'next/router'
import DashboardAtendente from 'pages/dashboard-atendente'
import Banner from 'components/atoms/Banner'
import { api } from 'services/api/api'
import {
  VolunteerResponse,
  VolunteerService
} from 'services/volunteers-service/volunteer-service'
import { volunteer } from 'utils/tests/volunteer'

jest.mock('store/auth-context')

jest.mock('next/router', () => ({
  useRouter: () => ({ push: jest.fn() }),
  push: jest.fn()
}))

jest.mock('../../../utils/authentication/getTokenData', () => ({
  getTokenData: () => ({
    id: 1
  })
}))

const availableSlots: any = [
  {
    id: 30,
    voluntarioId: 3575,
    inicio: '2022-08-12T03:30:00.000Z',
    fim: '2022-08-12T04:30:00.000Z'
  },
  {
    id: 31,
    voluntarioId: 3575,
    inicio: '2022-08-12T07:00:00.000Z',
    fim: '2022-08-12T08:00:00.000Z'
  }
]

const volunteerResponse = { ...volunteer, aprovado: true }

const findVolunteerByIdMock = jest
  .spyOn(VolunteerService.prototype, 'findById')
  .mockImplementation(
    jest.fn(() => Promise.resolve(volunteerResponse as VolunteerResponse))
  )

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
  it.skip('should render loader while data is being fetched', async () => {
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

    jest
      .spyOn(VolunteerService.prototype, 'findAvailableSlotsById')
      .mockImplementationOnce(jest.fn(() => Promise.resolve(availableSlots)))

    await act(async () => {
      render(<VolunteerDashboard />)
    })
  })

  it('should render title meus horários disponíveis', async () => {
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: /Meus horários disponíveis na semana/
      })
    ).toBeInTheDocument()
  })

  it.skip('should render a banner with no schedules content', () => {
    jest.spyOn(api, 'get').mockResolvedValueOnce({ data: [] })
    render(<Banner>{}</Banner>)

    expect(screen.getByText('Meus horários disponíveis')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Seus horários estão vazios. Adicione mais horários para continuar obtendo sessões.'
      )
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /INCLUIR MAIS HORÁRIOS/ })
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

  it('should render all available slots in a carrosel', () => {
    const cards = screen.getAllByText(/12\/08\/22/)
    expect(cards.length).toBe(availableSlots.length)
  })
})

describe('Volunteer welcome banner', () => {
  it('should show approved volunteer welcome banner when the volunteers status is true', async () => {
    jest
      .spyOn(VolunteerService.prototype, 'findAvailableSlotsById')
      .mockImplementationOnce(jest.fn(() => Promise.resolve([])))

    await applyTestSetup()

    expect(screen.getByTestId('approved-banner')).toBeInTheDocument()
  })
})

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
import {
  VolunteerResponse,
  VolunteerService
} from 'services/volunteers-service/volunteer-service'
import { volunteer } from 'utils/tests/volunteer'
import Banner from 'components/atoms/Banner'

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

const dateTime = new Date()

const availableSlots: any = [
  {
    id: 30,
    voluntarioId: 3575,
    inicio: dateTime.setDate(dateTime.getDate() + 1),
    fim: dateTime.setMinutes(dateTime.getMinutes() + 60)
  },
  {
    id: 31,
    voluntarioId: 3575,
    inicio: dateTime.setDate(dateTime.getDate() + 2),
    fim: dateTime.setMinutes(dateTime.getMinutes() + 60)
  },
  {
    id: 32,
    voluntarioId: 3575,
    inicio: dateTime.setDate(dateTime.getDate() + 8),
    fim: dateTime.setMinutes(dateTime.getMinutes() + 60)
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
  it('should render loader while data is being fetched', async () => {
    await applyTestSetup(false)
    expect(screen.getByTestId('loader')).toBeInTheDocument()
  })
})

describe('Atendente page with available slots', () => {
  beforeEach(async () => {
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(
        createAuthContextObject(true, UserType.ATENDENTE.toString(), true)
      )

    jest
      .spyOn(VolunteerService.prototype, 'findById')
      .mockImplementation(
        jest.fn(() => Promise.resolve(volunteerResponse as VolunteerResponse))
      )

    jest
      .spyOn(VolunteerService.prototype, 'findAvailableSlotsById')
      .mockImplementation(jest.fn(() => Promise.resolve(availableSlots)))

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

  it('should render button gerenciar horários', () => {
    expect(
      screen.getByRole('button', { name: /GERENCIAR HORÁRIOS/ })
    ).toBeInTheDocument()
  })

  it('should redirect to /dashboard-atendente/meus-horarios', () => {
    const button = screen.getByRole('button', { name: /GERENCIAR HORÁRIOS/ })
    userEvent.click(button)
    expect(router.push).toHaveBeenCalledWith(
      '/dashboard-atendente/meus-horarios'
    )
  })

  it('should render slots in a carrosel considering day+7 limit', () => {
    const cardsElement = screen.queryAllByTestId('time-card')
    expect(cardsElement.length).not.toBe(availableSlots.length)
    expect(cardsElement.length).toBe(2)
  })
})

describe('Volunteer welcome banner', () => {
  it('should show reproved volunteer welcome banner when the volunteers status is false', async () => {
    jest
      .spyOn(VolunteerService.prototype, 'findAvailableSlotsById')
      .mockImplementationOnce(jest.fn(() => Promise.resolve([])))

    const volunteerReproved = { ...volunteerResponse, aprovado: false }
    findVolunteerByIdMock.mockImplementationOnce(
      jest.fn(() => Promise.resolve(volunteerReproved as VolunteerResponse))
    )

    await applyTestSetup()

    expect(screen.getByTestId('reproved-banner')).toBeInTheDocument()
  })

  it('should show undefined volunteer welcome banner when the volunteers status is null', async () => {
    jest
      .spyOn(VolunteerService.prototype, 'findAvailableSlotsById')
      .mockImplementationOnce(jest.fn(() => Promise.resolve([])))

    const volunteerUndefined = { ...volunteerResponse, aprovado: null }
    findVolunteerByIdMock.mockImplementationOnce(
      jest.fn(() => Promise.resolve(volunteerUndefined as VolunteerResponse))
    )

    await applyTestSetup()

    expect(screen.getByTestId('undefined-banner')).toBeInTheDocument()
  })
})

describe('Atendente page without available slots', () => {
  beforeEach(async () => {
    jest
      .spyOn(AuthorizationContext, 'useAuthContext')
      .mockReturnValue(
        createAuthContextObject(true, UserType.ATENDENTE.toString(), true)
      )

    jest
      .spyOn(VolunteerService.prototype, 'findAvailableSlotsById')
      .mockImplementation(jest.fn(() => Promise.resolve([])))

    await act(async () => {
      render(<VolunteerDashboard />)
    })
  })

  it('should render a banner with no schedules content', () => {
    render(<Banner>{}</Banner>)

    expect(screen.getByText('Meus horários disponíveis')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /INCLUIR HORÁRIOS/ })
    ).toBeInTheDocument()
  })

  it('should redirect to /dashboard-atendente-horarios', () => {
    const button = screen.getByRole('button', { name: /INCLUIR HORÁRIOS/ })
    userEvent.click(button)
    expect(router.push).toHaveBeenCalledWith(
      '/dashboard-atendente/meus-horarios'
    )
  })
})

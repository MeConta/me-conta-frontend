import { act, render, screen } from 'utils/tests/helpers'
import MeusHorarios from 'pages/atendente/meus-horarios'
import createAuthContextObject from 'utils/tests/createAuthContextObject'
import * as AuthorizationContext from '../../../../store/auth-context'
import { UserType } from 'enums/user-type.enum'
import { AgendaService } from 'services/agenda-services/agenda-service'
import userEvent from '@testing-library/user-event'
import { pickDate } from 'components/molecules/AddDates/test'

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
      container = render(<MeusHorarios />).container
    })
  } else {
    container = render(<MeusHorarios />).container
  }

  return container
}

describe('Meus horários', () => {
  it('should render title "Selecione a data"', async () => {
    await applyTestSetup()

    expect(screen.getByText('Selecione a data')).toBeInTheDocument()
  })

  it('should render calendar', async () => {
    const container = await applyTestSetup()

    expect(container?.getElementsByClassName('DayPicker')).toHaveLength(1)
  })

  it('should call create slots service when save button on <AddDates> is clicked', async () => {
    const mockHandleSave = jest.spyOn(AgendaService.prototype, 'createSlots')
    await applyTestSetup()

    pickDate()
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: '08:00' })
    )

    const saveButton = screen.getByRole('button', { name: /salvar/i })

    userEvent.click(saveButton)

    expect(mockHandleSave).toHaveBeenCalled()
  })
})

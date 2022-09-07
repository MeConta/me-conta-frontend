import { render, screen, act } from '../../../utils/tests/helpers'
import { AddDates } from './index'
import userEvent from '@testing-library/user-event'
import { waitFor } from '@testing-library/react'
import router from 'next/router'
import theme from 'styles/theme'
import { VolunteerService } from '../../../services/volunteers-service/volunteer-service'
import { useToast } from 'services/toast-service/toast-service'

const userId = 10
jest.mock('../../../utils/authentication/getTokenData', () => ({
  getTokenData: () => ({
    id: userId
  })
}))

export function pickDate() {
  userEvent.click(screen.getByTestId('forward-button'))

  const pickFirstMonthDay = screen.getByText('10')

  act(() => {
    userEvent.click(pickFirstMonthDay)
  })
}

const findAvailableSlotsByIdMock = jest
  .spyOn(VolunteerService.prototype, 'findAvailableSlotsById')
  .mockImplementation(jest.fn(() => Promise.resolve([])))

describe('<AddDates />', () => {
  const mockHandleSave = jest.fn()
  const mockHandleDelete = jest.fn()

  beforeEach(() => {
    render(
      <AddDates
        alreadySelected={[]}
        handleSave={mockHandleSave}
        handleDeleteChip={mockHandleDelete}
      />
    )
  })

  describe('Render elements', () => {
    it('should render AddDates with no dates selected already', () => {
      expect(screen.getByText('Selecione a data')).toBeInTheDocument()

      expect(screen.queryByText('Seleciona o horário')).toBeNull()
    })

    it('should render AddDates with date selected and hours dropdown', () => {
      pickDate()
      expect(screen.getByText('Selecione os horários')).toBeInTheDocument()
    })

    it('should render hours dropdown with start at 8am and end at 8pm', () => {
      const firstHour = 1
      const lastHour = 25

      pickDate()
      const options = screen.getAllByRole('option')
      console.log(options)

      expect(options.length).toBe(26)
      expect(options[firstHour].innerHTML).toBe('08:00')
      expect(options[lastHour].innerHTML).toBe('20:00')
    })

    it('should remove hour from options when it was selected', () => {
      pickDate()
      const optionsBeforeSelect = screen.getAllByRole('option')
      userEvent.selectOptions(
        screen.getByRole('combobox'),
        screen.getByRole('option', { name: '08:00' })
      )

      const optionsAfterSlect = screen.getAllByRole('option')
      const firstHour = 1
      const lastHour = 23

      expect(optionsBeforeSelect.length).toBe(26)
      expect(optionsAfterSlect.length).toBe(24)

      expect(optionsAfterSlect[firstHour].innerHTML).toBe('09:00')
      expect(optionsAfterSlect[lastHour].innerHTML).toBe('20:00')
    })

    it('should not render "salvar" button when time slot is selected', () => {
      expect(
        screen.queryByRole('button', { name: /salvar/i })
      ).not.toBeInTheDocument()
    })

    it('should render "salvar" button when time slot is selected', () => {
      pickDate()
      userEvent.selectOptions(
        screen.getByRole('combobox'),
        screen.getByRole('option', { name: '08:00' })
      )

      expect(
        screen.getByRole('button', { name: /salvar/i })
      ).toBeInTheDocument()
    })
    it('should render timezone tooltip', () => {
      pickDate()
      const element = screen.getByTestId('tooltip')
      expect(element).toBeInTheDocument()
      userEvent.hover(element?.parentElement!)

      const tooltip = screen.getByText(
        'Fuso horário: Brasília (BRT). As sessões possuem 1h de duração.'
      )
      expect(tooltip).toBeInTheDocument()
      expect(tooltip).toHaveStyleRule(`visibility: visible`)
    })
  })

  describe('Save slots', () => {
    it('should call handleSave service when save button is clicked', () => {
      pickDate()
      userEvent.selectOptions(
        screen.getByRole('combobox'),
        screen.getByRole('option', { name: '08:00' })
      )

      const saveButton = screen.getByRole('button', { name: /salvar/i })

      userEvent.click(saveButton)

      expect(mockHandleSave).toHaveBeenCalled()
    })

    it('should render toast with successful message when "salvar" button is clicked', async () => {
      pickDate()
      userEvent.selectOptions(
        screen.getByRole('combobox'),
        screen.getByRole('option', { name: '08:00' })
      )

      userEvent.click(screen.getByRole('button', { name: /salvar/i }))

      await waitFor(() => {
        expect(useToast().emit).toHaveBeenCalledWith({
          type: 'success',
          message: 'Horários salvos com sucesso!'
        })
      })
    })
  })

  describe('Button voltar ao dashboard', () => {
    it('should render button link to return to atendente Dashboard', async () => {
      pickDate()
      expect(
        screen.getByRole('button', { name: /Voltar ao Dashboard/i })
      ).toBeInTheDocument()
    })

    it('should go back to dashboard when button "Voltar ao Dashboard" is clicked', async () => {
      pickDate()
      userEvent.click(
        screen.getByRole('button', { name: /Voltar ao Dashboard/i })
      )

      expect(router.push).toHaveBeenCalledWith('/dashboard-atendente')
    })
  })

  it('should change time slot chips color to green when the save button is clicked', () => {
    pickDate()
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: '08:00' })
    )
    userEvent.click(screen.getByRole('button', { name: /salvar/i }))

    setTimeout(() => {
      expect(screen.getByTestId('chip')).toHaveStyle(
        `background-color: ${theme.colors.darkPastelGreen};
        color: white;`
      )
    }, 1000)
  })

  it('should clear selectedSlots when clicked on a different date on calendar', () => {
    pickDate()
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: '08:00' })
    )

    let slotsSelect = screen.queryByText('08:00')

    const pickDifferentDate = screen.getByText('12')
    userEvent.click(pickDifferentDate)

    setTimeout(() => {
      expect(slotsSelect).not.toBeInTheDocument()
    }, 4000)
  })

  it.skip('should call list slot when a date is selected', () => {
    jest.clearAllMocks()

    act(() => userEvent.click(screen.getByText('30')))

    const addMonth = 1
    const currentDate = new Date()
    const currentMonth = ('0' + (currentDate.getMonth() + addMonth)).slice(-2)
    const currentYear = currentDate.getFullYear()
    const expectedDate = new Date(
      `${currentYear}-${currentMonth}-30T15:00:00.000Z`
    )

    //expect(findAvailableSlotsByIdMock).toBeCalledTimes(1)
    expect(findAvailableSlotsByIdMock).toBeCalledWith(10, expectedDate)
  })
})

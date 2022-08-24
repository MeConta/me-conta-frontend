import { render, screen, act } from '../../../utils/tests/helpers'
import { AddDates } from './index'
import userEvent from '@testing-library/user-event'
import { RenderResult, waitFor } from '@testing-library/react'
import router from 'next/router'
import { useToast } from 'services/toast-service/toast-service'
import theme from 'styles/theme'

export function pickDate() {
  const pickLastMonthDay = screen.queryByText('31')
    ? screen.getByText('31')
    : screen.getByText('30')

  act(() => {
    userEvent.click(pickLastMonthDay)
  })
}

describe('<AddDates />', () => {
  const mockHandleSave = jest.fn()

  let renderComponent: RenderResult

  beforeEach(() => {
    renderComponent = render(
      <AddDates alreadySelected={[]} handleSave={mockHandleSave} />
    )
  })

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

    expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument()
  })

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

  it('should change time slot chips color to green when the save button is clicked', () => {
    pickDate()
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: '08:00' })
    )
    userEvent.click(screen.getByRole('button', { name: /salvar/i }))

    expect(screen.getByTestId('chip')).toHaveStyle(
      `background-color: ${theme.colors.darkPastelGreen};
        color: white;`
    )
  })
})

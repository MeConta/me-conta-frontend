import { render, screen, act } from '../../../utils/tests/helpers'
import { AddDates } from './index'
import userEvent from '@testing-library/user-event'
import { RenderResult, within } from '@testing-library/react'

describe('<AddDates />', () => {
  const mockHandleSave = jest.fn()

  let renderComponent: RenderResult

  it('should render AddDates with no dates selected already', () => {
    renderComponent = render(
      <AddDates alreadySelected={[]} handleSave={mockHandleSave} />
    )

    expect(screen.getByText('Selecione a data')).toBeInTheDocument()

    expect(screen.queryByText('Seleciona o horário')).toBeNull()
  })

  it('should render AddDates with date selected and hours dropdown', () => {
    renderComponent = render(
      <AddDates alreadySelected={[]} handleSave={mockHandleSave} />
    )

    const pickLastMonthDay = screen.queryByText('31')
      ? screen.queryByText('31')
      : screen.queryByText('30')

    act(() => {
      // @ts-ignore
      userEvent.click(pickLastMonthDay)
    })

    expect(screen.getByText('Selecione os horários')).toBeInTheDocument()
  })

  it('should render hours dropdown with start at 8am and end at 8pm', () => {
    const firstHour = 1
    const lastHour = 25
    renderComponent = render(
      <AddDates alreadySelected={[]} handleSave={mockHandleSave} />
    )

    const pickLastMonthDay = screen.queryByText('31')
      ? screen.queryByText('31')
      : screen.queryByText('30')

    act(() => {
      // @ts-ignore
      userEvent.click(pickLastMonthDay)
    })
    const options = screen.getAllByRole('option')

    expect(options.length).toBe(26)
    expect(options[firstHour].innerHTML).toBe('08:00')
    expect(options[lastHour].innerHTML).toBe('20:00')
  })

  it('should remove hour from options when it was selected', () => {
    renderComponent = render(
      <AddDates alreadySelected={[]} handleSave={mockHandleSave} />
    )

    const pickLastMonthDay = screen.queryByText('31')
      ? screen.queryByText('31')
      : screen.queryByText('30')

    act(() => {
      // @ts-ignore
      userEvent.click(pickLastMonthDay)
    })
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
    render(<AddDates alreadySelected={[]} handleSave={mockHandleSave} />)

    expect(
      screen.queryByRole('button', { name: /salvar/i })
    ).not.toBeInTheDocument()
  })

  it('should render "salvar" button when time slot is selected', () => {
    render(<AddDates alreadySelected={[]} handleSave={mockHandleSave} />)

    const pickLastMonthDay = screen.queryByText('31')
      ? screen.queryByText('31')
      : screen.queryByText('30')

    act(() => {
      // @ts-ignore
      userEvent.click(pickLastMonthDay)
    })
    const optionsBeforeSelect = screen.getAllByRole('option')
    userEvent.selectOptions(
      screen.getByRole('combobox'),
      screen.getByRole('option', { name: '08:00' })
    )

    expect(screen.getByRole('button', { name: /salvar/i })).toBeInTheDocument()
  })
})

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
    expect(screen.getByRole('button', { name: 'Salvar' }))

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
})

import { render, screen, act } from '../../../utils/tests/helpers'
import { AddDates } from './index'
import userEvent from '@testing-library/user-event'
import { RenderResult } from '@testing-library/react'

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

  it('should render AddDates with no dates selected already', () => {
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

    expect(screen.getByText('Seleciona o horário')).toBeInTheDocument()
  })
})

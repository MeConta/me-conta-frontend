import DayColumn from '.'
import { render, screen } from '../../../../utils/tests/helpers'

describe('<DayColumn />', () => {
  const onChangeMock = jest.fn()

  beforeEach(() => {
    const dateInfo = [
      new Date(2021, 10, 24, 13),
      new Date(2021, 10, 24, 14),
      new Date(2021, 10, 24, 15)
    ]
    render(<DayColumn times={dateInfo} onChange={onChangeMock} />)
  })

  it('should render day of week in corect format', () => {
    expect(screen.getByText('qua')).toHaveStyle({ textTransform: 'capitalize' })
  })

  it('should render date in corect format', () => {
    expect(screen.getByText('24/nov')).toHaveStyle({
      textTransform: 'uppercase'
    })
  })

  it('should render time in corect format', () => {
    expect(screen.getByText('13:00')).toBeInTheDocument()
  })

  it('should render three buttons', () => {
    expect(screen.queryAllByRole('button')).toHaveLength(3)
  })

  it('should execute function on click', () => {
    screen.getByText('13:00').click()
    expect(onChangeMock).toHaveBeenCalledWith(new Date(2021, 10, 24, 13))
  })
})

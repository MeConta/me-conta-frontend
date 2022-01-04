import '../../../utils/tests/matchMedia.mock'
import { render, screen } from '../../../utils/tests/helpers'

import { DateSelect } from './index'

describe('<Carousel />', () => {
  const dateInfo = [
    [
      new Date(2021, 10, 24, 13),
      new Date(2021, 10, 24, 14),
      new Date(2021, 10, 24, 18)
    ],
    [new Date(2021, 10, 25, 15)],
    [new Date(2021, 10, 26, 14), new Date(2021, 10, 26, 17)],
    [new Date(2021, 10, 26, 14), new Date(2021, 10, 26, 17)],
    [new Date(2021, 10, 26, 14), new Date(2021, 10, 26, 17)]
  ]

  it('should render 4 day columns', () => {
    let element = render(
      <DateSelect availabilty={dateInfo} onChange={() => null} />
    )
    let dayColumns = element.container.querySelectorAll(
      '.slick-slide[aria-hidden=false]'
    )
    expect(dayColumns).toHaveLength(4)
  })

  it('should render the next button when the number of day column is more than 4', () => {
    render(<DateSelect availabilty={dateInfo} onChange={() => null} />)
    const nextButtonElement = screen.getByRole('button', {
      name: 'ir para a próxima página'
    })
    expect(nextButtonElement).toBeInTheDocument()
  })

  it('should render the previous button when the number of day column is more than 4', () => {
    render(<DateSelect availabilty={dateInfo} onChange={() => null} />)
    const previousButtonElement = screen.getByRole('button', {
      name: 'ir para página anterior'
    })
    expect(previousButtonElement).toBeInTheDocument()
  })

  it('should render button 1 and 2 to navigate between pages', () => {
    render(<DateSelect availabilty={dateInfo} onChange={() => null} />)
    expect(screen.queryByRole('button', { name: '1' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: '2' })).toBeInTheDocument()
  })
})

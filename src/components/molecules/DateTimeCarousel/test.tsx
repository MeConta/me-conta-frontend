import '../../../utils/tests/matchMedia.mock'
import { render, screen } from '../../../utils/tests/helpers'

import { DateTimeCarousel } from './index'

describe('<DateTimeCarousel />', () => {
  it('should render a card for each schedule element', () => {
    const schedules = [
      { date: '06 de Junho de 2022', time: '13:00' },
      { date: '14 de Junho de 2022', time: '14:00' },
      { date: '24 de Junho de 2022', time: '15:00' },
      { date: '25 de Junho de 2022', time: '17:00' },
      { date: '26 de Junho de 2022', time: '13:00' },
      { date: '14 de Junho de 2022', time: '15:00' },
      { date: '15 de Junho de 2022', time: '17:00' }
    ]

    render(<DateTimeCarousel schedules={schedules} />)

    const carouselCards = screen.getAllByText(/Junho/)
    expect(carouselCards.length).toBe(schedules.length)
  })

  it.skip('should render next and preview buttons when the number of cards is more than 7', () => {
    const schedules = [
      { date: '26 de Junho de 2022', time: '13:00' },
      { date: '24 de Junho de 2022', time: '14:00' },
      { date: '24 de Junho de 2022', time: '15:00' },
      { date: '25 de Junho de 2022', time: '17:00' },
      { date: '26 de Junho de 2022', time: '13:00' },
      { date: '24 de Junho de 2022', time: '14:00' },
      { date: '24 de Junho de 2022', time: '15:00' },
      { date: '25 de Junho de 2022', time: '17:00' }
    ]

    render(<DateTimeCarousel schedules={schedules} />)
    const buttons = screen.queryAllByRole('button')
    expect(buttons.length).toBe(2)
  })
})

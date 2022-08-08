import '../../../utils/tests/matchMedia.mock'
import { render, screen } from '../../../utils/tests/helpers'

import { DateTimeCarousel } from './index'

describe('<DateTimeCarousel />', () => {
  it('should render a card for each schedule element', () => {
    const schedules = [
      { dateTime: new Date('2022-06-14T18:00:00.000Z') },
      { dateTime: new Date('2022-06-14T18:00:00.000Z') },
      { dateTime: new Date('2022-06-14T18:00:00.000Z') },
      { dateTime: new Date('2022-06-14T18:00:00.000Z') },
      { dateTime: new Date('2022-06-14T18:00:00.000Z') },
      { dateTime: new Date('2022-06-14T18:00:00.000Z') },
      { dateTime: new Date('2022-06-14T18:00:00.000Z') }
    ]

    render(<DateTimeCarousel schedules={schedules} />)

    const carouselCards = screen.getAllByText(/14\/06\/2022/)
    expect(carouselCards.length).toBe(schedules.length)
  })

  it('should render a card for each schedule element when there is less than 7 elements', () => {
    const schedules = [
      { dateTime: new Date('2022-06-14T18:00:00.000Z') },
      { dateTime: new Date('2022-06-14T18:00:00.000Z') },
      { dateTime: new Date('2022-06-14T18:00:00.000Z') },
      { dateTime: new Date('2022-06-14T18:00:00.000Z') },
      { dateTime: new Date('2022-06-14T18:00:00.000Z') }
    ]

    render(<DateTimeCarousel schedules={schedules} />)

    const carouselCards = screen.getAllByText(/14\/06\/2022/)
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

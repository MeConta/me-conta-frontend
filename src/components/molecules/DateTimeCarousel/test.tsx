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

    const carouselCards = screen.getAllByText(/14\/06\/22/)
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

    const carouselCards = screen.getAllByText(/14\/06\/22/)
    expect(carouselCards.length).toBe(schedules.length)
  })
})

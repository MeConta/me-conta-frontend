import '../../../utils/tests/matchMedia.mock'
import { render, screen } from '../../../utils/tests/helpers'

import { DateTimeCarousel } from './index'

describe('<DateTimeCarousel />', () => {
  it('should render a card for each team member element', () => {
    const schedules = [
      { date: '06 de Junho de 2022', time: '13:00' },
      { date: '14 de Junho de 2022', time: '14:00' },
      { date: '14 de Junho de 2022', time: '15:00' },
      { date: '15 de Junho de 2022', time: '17:00' }
    ]

    render(<DateTimeCarousel schedules={schedules} />)

    const carouselCards = screen.getAllByText(/Junho/)
    expect(carouselCards.length).toBe(schedules.length)
  })

  // it('should render a next button when the number of cards is more than 4', () => {
  //   const teamMembers = [
  //     { name: 'Letícia Ferraz', title: 'Psicóloga' },
  //     { name: 'Vitória Melo', title: 'Psicóloga' },
  //     { name: 'Jéssica Ribeiro', title: 'Psicóloga' },
  //     { name: 'Aline Dantas', title: 'Psicóloga' },
  //     { name: 'Aline Dantas', title: 'Psicóloga' }
  //   ]
  //   render(<Carousel teamMembers={teamMembers} />)
  //   const nextButtonElement = screen.getByRole('button', { name: 'Next' })
  //   expect(nextButtonElement).toBeInTheDocument()
  // })
})

import '../../../utils/tests/matchMedia.mock'
import { render, screen } from '../../../utils/tests/helpers'

import { Carousel } from './index'

describe('<Carousel />', () => {
  it('should render a card for each team member element', () => {
    const teamMembers = [
      { name: 'Letícia Ferraz', title: 'Psicóloga' },
      { name: 'Vitória Melo', title: 'Psicóloga' },
      { name: 'Jéssica Ribeiro', title: 'Psicóloga' },
      { name: 'Aline Dantas', title: 'Psicóloga' }
    ]

    render(<Carousel teamMembers={teamMembers} />)
    const carouselCards = screen.getAllByText('Psicóloga')
    expect(carouselCards.length).toBe(teamMembers.length)
  })

  it('should render a next button when the number of cards is more than 4', () => {
    const teamMembers = [
      { name: 'Letícia Ferraz', title: 'Psicóloga' },
      { name: 'Vitória Melo', title: 'Psicóloga' },
      { name: 'Jéssica Ribeiro', title: 'Psicóloga' },
      { name: 'Aline Dantas', title: 'Psicóloga' },
      { name: 'Aline Dantas', title: 'Psicóloga' }
    ]
    render(<Carousel teamMembers={teamMembers} />)
    const nextButtonElement = screen.getByRole('button', { name: 'Next' })
    expect(nextButtonElement).toBeInTheDocument()
  })
})

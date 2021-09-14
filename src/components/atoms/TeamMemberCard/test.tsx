import { render, screen } from '../../../utils/tests/helpers'

import { TeamMemberCard } from './index'

describe('screen show main itens for card member', () => {
  const attendee = {
    imageSrc: '/vista-aerea-de-campo-com-floresta_144627-45254.jpg',
    imageAlt: '',
    name: 'at01',
    title: 'psicóloga'
  }
  render(
    <TeamMemberCard
      key={attendee.name}
      imageSrc={attendee.imageSrc}
      imageAlt={attendee.imageAlt}
      name={attendee.name}
      title={attendee.title}
    />
  )

  it('verify name and title', () => {
    const name = screen.getByText('at01')
    expect(name).toBeInTheDocument()
    const title = screen.getByText('psicóloga')
    expect(title).toBeInTheDocument()
  })
})

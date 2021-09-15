import { render, screen } from '../../../utils/tests/helpers'

import { TeamMemberCard } from './index'

describe('screen show main itens for card member', () => {
  const attendee = {
    name: 'at01',
    title: 'psicóloga'
  }
  render(<TeamMemberCard name={attendee.name} title={attendee.title} />)

  it('verify name and title', () => {
    const name = screen.getByText('at01')
    expect(name).toBeInTheDocument()
    const title = screen.getByText('psicóloga')
    expect(title).toBeInTheDocument()
  })
})

import '../../../utils/tests/matchMedia.mock'

import { render, screen } from '../../../utils/tests/helpers'
import { CardScheduledSession } from './index'

describe('<CardScheduledSession />', () => {
  beforeEach(() => {
    render(
      <CardScheduledSession
        name="Test Name"
        email="teste.com"
        frentes={[0, 1, 2]}
      />
    )
  })

  it('should render the name', () => {
    expect(screen.getByText('Test Name')).toBeInTheDocument()
  })
  it('should render the frentes icon', () => {
    expect(screen.getByAltText('Coaching de Estudos')).toBeInTheDocument()
    expect(screen.getByAltText('Acolhimento')).toBeInTheDocument()
    expect(screen.getByAltText('Orientação Vocacional')).toBeInTheDocument()
  })
})

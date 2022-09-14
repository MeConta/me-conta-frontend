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
        description="Testado description do collapse"
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

  it('should render "Observações para a sessão" collapse', () => {
    expect(screen.getByText('Observações para a sessão')).toBeInTheDocument()
  })

  it('should render "Entrar na sessão" button', () => {
    expect(screen.getByText('Entrar na sessão')).toBeInTheDocument()
  })

  it('should render cancel button', () => {
    expect(screen.getByText(/cancelar/i)).toBeInTheDocument()
  })
})

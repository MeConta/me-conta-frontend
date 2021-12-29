import { render, screen } from '../../../utils/tests/helpers'
import { CardPaciente } from './index'
describe('<CardPaciente />', () => {
  beforeEach(() => {
    render(
      <CardPaciente
        date="29 de Janeiro às 14h"
        name="Luvois Anedo Zaladar"
        email="jitewaboh@lagify.com"
        profileLink="htpps://www.google.com"
        frentes={[0]}
        description="any description"
        title="sobre Luvois Anedo Zaladar"
        whatsappLink="http://www.google.com"
      />
    )
  })

  it('should render the description', () => {
    expect(screen.getByText('any description')).toBeInTheDocument()
  })

  it('should render the title', () => {
    expect(screen.getByText('sobre Luvois Anedo Zaladar')).toBeInTheDocument()
  })

  it('should render the whatsapp button', () => {
    expect(
      screen.getByText('Entrar em contato via whatsapp')
    ).toBeInTheDocument()
  })

  it('should render the date', () => {
    expect(screen.getByText('29 de Janeiro às 14h')).toBeInTheDocument()
  })

  it('should render the cancel button', () => {
    expect(screen.getByText('cancelar')).toBeInTheDocument()
  })
})

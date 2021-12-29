import { render, screen } from '../../../utils/tests/helpers'
import { CardVoluntario } from './index'
describe('<CardVoluntario />', () => {
  beforeEach(() => {
    render(
      <CardVoluntario
        name="Luvois Anedo Zaladar"
        email="jitewaboh@lagify.com"
        profileLink="htpps://www.google.com"
        frentes={[0]}
        title="sobre Luvois Anedo Zaladar"
        description="any description"
      />
    )
  })

  it('should render the title', () => {
    expect(screen.getByText('sobre Luvois Anedo Zaladar')).toBeInTheDocument()
  })

  it('should render description', () => {
    expect(screen.getByText('any description')).toBeInTheDocument()
  })
})

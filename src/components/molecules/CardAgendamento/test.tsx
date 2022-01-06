import '../../../utils/tests/matchMedia.mock'

import { render, screen } from '../../../utils/tests/helpers'
import { CardAgendamento } from './index'
import { DateInfo } from '../DateSelect/dateInfo'

describe('<CardAgendamento />', () => {
  beforeEach(() => {
    render(
      <CardAgendamento
        name="Luvois Zaladar"
        email="jitewaboh@lagify.com"
        profileLink="https://www.google.com/"
        frentes={[0, 1, 2]}
        title="Observação para a sessão"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pellentesque cursus lacinia. Duis vehicula, felis eu aliquam fermentum, diam mauris maximus tortor iam mauris maximus torto riam mauris  rtor"
        availability={DateInfo}
        onChange={() => null}
      />
    )
  })

  it('should render the components', () => {
    expect(screen.getByTestId('date-select')).toBeInTheDocument()
    expect(screen.getByTestId('card-voluntario')).toBeInTheDocument()
  })
})

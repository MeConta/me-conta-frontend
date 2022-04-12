import { render, screen } from '../../../utils/tests/helpers'
import VolunteerRow from './index'

describe('<VolunteerRow />', function () {
  it('should render VolunteerRow data', function () {
    render(<VolunteerRow />)
    expect(screen.getByText('Approvado')).toBeInTheDocument()
    expect(screen.getByText('Atendente')).toBeInTheDocument()
    expect(screen.getByText('Test name')).toBeInTheDocument()
    expect(screen.getByText('Não')).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: 'Ver Perfil' })
    ).toBeInTheDocument()
  })

  it('should have proper styles', function () {
    render(<VolunteerRow />)
    expect(screen.getByTestId('row-container')).toHaveStyle({
      width: '100%',
      'border-radius': '4px',
      background: '#458FF6'
    })
  })
})

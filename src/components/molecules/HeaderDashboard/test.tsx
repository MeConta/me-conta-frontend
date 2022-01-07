import { render, screen } from 'utils/tests/helpers'
import HeaderDashboard from '.'

describe('<HeaderDashboard />', () => {
  it('deve mostrar a logo do meconta', () => {
    render(<HeaderDashboard />)

    expect(
      screen.getByRole('img', { name: 'Logo Me Conta' })
    ).toBeInTheDocument()
  })
})

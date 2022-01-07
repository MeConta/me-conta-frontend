import { render, screen } from 'utils/tests/helpers'
import HeaderDashboard from '.'

describe('<HeaderDashboard />', () => {
  it('deve mostrar a logo do meconta', () => {
    render(<HeaderDashboard userName="John Doe" logoSrc="/mock-image.png" />)

    expect(
      screen.getByRole('img', { name: 'Logo Me Conta' })
    ).toBeInTheDocument()
  })

  it('deve renderizar os links', () => {
    render(<HeaderDashboard userName="John Doe" logoSrc="/mock-image.png" />)

    expect(screen.getByRole('link', { name: 'Agenda' })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: 'Meus horários' })
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Meu perfil' })).toBeInTheDocument()
  })

  it('deve renderizar o nome do usuário', () => {
    render(<HeaderDashboard userName="John Doe" logoSrc="/mock-image.png" />)

    expect(screen.getByText('Olá,')).toBeInTheDocument()
    expect(screen.getByText('John Doe')).toBeInTheDocument()
  })
})

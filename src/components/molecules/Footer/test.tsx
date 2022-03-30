import { render, screen } from 'utils/tests/helpers'
import Footer from '.'

describe('<Footer />', () => {
  beforeEach(() => {
    render(
      <Footer
        logoFacebook="/mock-facebool.png"
        logoInstagram="/mock-instagram.png"
        logoLinkedin="/mock-linkedin.png"
      />
    )
  })

  it('deve mostrar titulo', () => {
    expect(
      screen.getByRole('heading', { name: 'Me Conta?' })
    ).toBeInTheDocument()
  })

  it('deve mostrar descripcion', () => {
    expect(
      screen.queryByText(
        'O Me Conta? é um projeto social sem fins lucrativos. Quer apoiar nossa ideia?'
      )
    ).not.toBeNull()

    expect(
      screen.queryByText('Envie-nos um email para central@meconta.org')
    ).not.toBeNull()
  })

  it('deve mostrar a logo do facebook', () => {
    expect(
      screen.getByRole('img', { name: 'Me Conta Facebook' })
    ).toBeInTheDocument()
  })

  it('deve mostrar a logo do instagram', () => {
    expect(
      screen.getByRole('img', { name: 'Me Conta Instagram' })
    ).toBeInTheDocument()
  })

  it('deve mostrar a logo do linkedin', () => {
    expect(
      screen.getByRole('img', { name: 'Me Conta Linkedin' })
    ).toBeInTheDocument()
  })
})

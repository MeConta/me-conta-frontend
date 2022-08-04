import { render, screen, within } from '../../../utils/tests/helpers'
import BannerContainer from '.'

const bannerAprovedContent = {
  title: 'Bem-vindo(a) ao MeConta!',
  body: 'Sua agenda está vazia. Comece adicionando horários para obter sessões.',
  buttonText: 'INCLUIR HORÁRIOS'
}
const bannerReprovedContent = {
  title: 'Status: Não aprovado',
  body: 'Seu perfil não atendeu aos critérios. Caso haja alguma dúvida, entre em contato conosco pelo e-mail central@meconta.org.'
}
const bannerUndefinedContent = {
  title: 'Bem-vindo(a) ao MeConta!',
  body: 'Nossa equipe irá analisar seu perfil e entrará em contato por e-mail em breve.'
}

describe('<BannerContainer />', () => {
  it('should render Banner with aproved information when approvalStatus is true', () => {
    render(<BannerContainer approvalStatus={true}></BannerContainer>)

    const banner = screen.getByTestId('banner')
    expect(banner).toBeInTheDocument()

    expect(
      within(banner).getByRole('heading', { level: 1 }).textContent
    ).toEqual(bannerAprovedContent.title)

    expect(
      within(banner).getByText(bannerAprovedContent.body)
    ).toBeInTheDocument()

    expect(
      within(banner).getByRole('button', {
        name: bannerAprovedContent.buttonText
      })
    ).toBeInTheDocument()
  })

  it('should render Banner with reject information when approvalStatus is false', () => {
    render(<BannerContainer approvalStatus={false}></BannerContainer>)

    const banner = screen.getByTestId('banner')
    expect(banner).toBeInTheDocument()

    expect(
      within(banner).getByRole('heading', { level: 1 }).textContent
    ).toEqual(bannerReprovedContent.title)

    expect(
      within(banner).getByText(bannerReprovedContent.body)
    ).toBeInTheDocument()
  })

  it('should render Banner with undefined information when approvalStatus is null or undefined', () => {
    render(<BannerContainer approvalStatus={null}></BannerContainer>)

    const banner = screen.getByTestId('banner')
    expect(banner).toBeInTheDocument()

    expect(
      within(banner).getByRole('heading', { level: 1 }).textContent
    ).toEqual(bannerUndefinedContent.title)

    expect(
      within(banner).getByText(bannerUndefinedContent.body)
    ).toBeInTheDocument()
  })
})

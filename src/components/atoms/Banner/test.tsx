import { render, screen } from 'utils/tests/helpers'

import Banner from '.'

const defaultIllustrationSrc = '/illustrations/me-conta-card-illustration.svg'

const bannerContent = () => {
  return (
    <div>
      <h1>Banner Title</h1>
      <button>Click me</button>
    </div>
  )
}

describe('<Banner/>', () => {
  it('should render a Banner with the children prop content and a default image', () => {
    render(<Banner>{bannerContent()}</Banner>)

    expect(screen.getByText('Banner Title')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()

    const bannerImage = screen.getByRole('img')
    expect(bannerImage).toBeInTheDocument()
    expect(bannerImage.getAttribute('src')).toBe(defaultIllustrationSrc)
  })

  it('should render a Banner with a different image when it is passed by prop', () => {
    const imageSrc = '/assets/logo.png'
    render(<Banner imageSrc={imageSrc}>{bannerContent()}</Banner>)

    const bannerImage = screen.getByRole('img')
    expect(bannerImage.getAttribute('src')).toBe(imageSrc)
  })
})

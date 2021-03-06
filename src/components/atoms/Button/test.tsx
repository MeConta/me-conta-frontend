import { render, screen, waitFor } from 'utils/tests/helpers'

import { Button } from '.'

describe('<Button/>', () => {
  it('should render large size by default', () => {
    render(<Button>button</Button>)
    expect(screen.getByRole('button')).toHaveStyle({
      'min-height': '5rem',
      'font-size': '2.2rem'
    })
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toMatchSnapshot()
  })

  it('should render button with color', () => {
    render(<Button>button</Button>)
    expect(screen.getByRole('button')).toHaveStyle({ background: '#458FF6' })
  })

  it('should render button with color when hovering over', () => {
    render(<Button>button</Button>)
    expect(screen.getByRole('button')).toHaveStyleRule(
      'background-color',
      '#0545AB',
      { modifier: ':hover' }
    )
  })

  it('should render the button with a round border radius by default', () => {
    render(<Button>button</Button>)
    expect(screen.getByRole('button')).toHaveStyle({
      'border-radius': '3.4rem'
    })
  })

  it('should render the button with a "square" border radius', () => {
    render(<Button radius="square">button</Button>)
    expect(screen.getByRole('button')).toHaveStyle({
      'border-radius': '0.7rem'
    })
  })

  it('should render the button with a medium size', () => {
    render(<Button size="medium">button</Button>)
    expect(screen.getByRole('button')).toHaveStyle({
      'min-height': '3rem',
      'font-size': '1.2rem'
    })
  })

  it('should render the button with a mobile large size', () => {
    render(<Button size="mediumLarge">button</Button>)
    expect(screen.getByRole('button')).toHaveStyle({
      'min-height': '6rem',
      'font-size': '1.8rem'
    })
  })

  it('should render a button with secondary color', () => {
    render(<Button color="secondary">button</Button>)
    expect(screen.getByRole('button')).toHaveStyle({
      'background-color': '#DE3163'
    })
  })

  it('should render a button with negative color set', () => {
    render(<Button color="negative">button</Button>)
    expect(screen.getByRole('button')).toHaveStyle({
      'background-color': '#FFFFFF',
      color: '#DE3163',
      border: '1px solid #DE3163'
    })
  })

  it('should render Button as a link', () => {
    render(
      <Button as="a" href="/link">
        button
      </Button>
    )
    expect(screen.getByRole('link')).toHaveAttribute('href', '/link')
  })

  it('should render disabled Button', () => {
    render(<Button disabled>button</Button>)
    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toBeDisabled()
    expect(buttonElement).toHaveStyleRule('cursor', 'not-allowed', {
      modifier: ':disabled'
    })
  })

  it('should render Button disabled with loader', () => {
    render(<Button isLoading>button</Button>)
    const buttonElement = screen.getByRole('button')
    expect(buttonElement).toBeDisabled()
    expect(buttonElement).toHaveStyleRule('cursor', 'not-allowed', {
      modifier: ':disabled'
    })
    const loader = screen.getByTestId('loader')
    expect(buttonElement).toContainElement(loader)
    const defaultLoaderSizeForButton = '30px',
      defaultLoaderBorderForButton = '5px'
    const solid = 'solid'
    expect(loader).toHaveStyle({
      width: defaultLoaderSizeForButton,
      height: defaultLoaderSizeForButton,
      border: `${defaultLoaderBorderForButton} ${solid} #E6E6E6`,
      borderTop: `${defaultLoaderBorderForButton} ${solid} #DE3163`
    })
  })

  it('should call onFillDone when the fillOver is done', async () => {
    const fillDone = jest.fn()
    render(
      <Button fillOver onFillDone={fillDone} fillOverDuration={2000}>
        button
      </Button>
    )
    await waitFor(() => expect(fillDone).toHaveBeenCalled(), {
      timeout: 4000
    })
  })

  it('should not to render Button with loader when isLoading is false', () => {
    render(<Button isLoading={false}>button</Button>)
    expect(screen.findByTestId('loader')).toMatchObject({})
  })
})

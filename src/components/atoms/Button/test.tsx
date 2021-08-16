import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import Button from '.'

describe('<Button/>', () => {
  it('should render large size by default', () => {
    renderWithTheme(<Button>button</Button>)
    expect(screen.getByRole('button')).toHaveStyle({
      height: '5rem',
      'font-size': '2.2rem'
    })
    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button')).toMatchSnapshot()
  })

  it('should render button with color', () => {
    renderWithTheme(<Button>button</Button>)
    expect(screen.getByRole('button')).toHaveStyle({ background: '#458FF6' })
  })

  it('should render button with color when hovering over', () => {
    renderWithTheme(<Button>button</Button>)
    expect(screen.getByRole('button')).toHaveStyleRule(
      'background-color',
      '#0545AB',
      { modifier: ':hover' }
    )
  })

  it('should render the button with a border radius', () => {
    renderWithTheme(<Button>button</Button>)
    expect(screen.getByRole('button')).toHaveStyle({
      'border-radius': '3.4rem'
    })
  })

  it('should render the button with a medium size', () => {
    renderWithTheme(<Button size="medium">button</Button>)
    expect(screen.getByRole('button')).toHaveStyle({
      height: '3rem',
      'font-size': '1.2rem'
    })
  })

  it('should render a button with secondary color', () => {
    renderWithTheme(<Button color="secondary">button</Button>)
    expect(screen.getByRole('button')).toHaveStyle({
      'background-color': '#DE3163'
    })
  })
})

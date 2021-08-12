import{screen} from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import Button from '.'

describe('<Button/>', () => {
  it('should render Button', () => {
    renderWithTheme(<Button/>)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should render button with color', () => {
    renderWithTheme(<Button/>)
    expect(screen.getByRole('button')).toHaveStyle({'background': '#458FF6'})
  })

  it('should render button with color when hovering over', () => {
    renderWithTheme(<Button/>)
    expect(screen.getByRole('button')).toHaveStyleRule('background', '#0545AB', {modifier: ':hover'})
  })

  it('should render the button with a border radius', () => {
    renderWithTheme(<Button/>)
    expect(screen.getByRole('button')).toHaveStyle({'border-radius': '3.4rem'})
  })

  it('should render medium size by default', () => {
    renderWithTheme(<Button/>)
    expect(screen.getByRole('button')).toHaveStyle({
      height: '1.8rem',
      //padding: '1rem',
      'font-size': '1rem'
      })
  })
})


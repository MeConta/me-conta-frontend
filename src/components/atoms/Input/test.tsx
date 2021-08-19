import { screen } from '@testing-library/react'
import { renderWithTheme } from 'utils/tests/helpers'
import { Input } from '.'

describe('<Input/>', () => {
  it('should render the input with defined style', () => {
    renderWithTheme(<Input />)
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toHaveStyle({
      'background-color': '#FFFFFF',
      'border': '1px solid #848A8C',
      'border-radius': '0.7rem',
      'padding': '0.8rem 5.6rem'
    })
    // expect(screen.getByRole('input')).toMatchSnapshot()
  })
})

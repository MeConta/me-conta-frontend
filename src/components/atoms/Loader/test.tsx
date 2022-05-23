import Loader from './index'
import { render, screen } from '../../../utils/tests/helpers'

describe('<Loader />', () => {
  it('should render loader', () => {
    render(<Loader />)
    expect(screen.getByTestId('loader-container')).toHaveStyle({
      width: '100%',
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center'
    })
    expect(screen.getByTestId('loader')).toHaveStyle({
      border: '10px solid #e6e6e6'
    })
  })

  it('should render loader with props', () => {
    const size = '30px',
      borderSize = '3px'
    const solid = 'solid'
    render(<Loader size={size} borderSize={borderSize} />)
    expect(screen.getByTestId('loader')).toHaveStyle({
      width: size,
      height: size,
      border: `${borderSize} ${solid} #E6E6E6`,
      borderTop: `${borderSize} ${solid} #DE3163`
    })
  })
})

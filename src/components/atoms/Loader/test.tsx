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
})

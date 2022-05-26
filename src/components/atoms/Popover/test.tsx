import theme from 'styles/theme'
import { render, screen } from 'utils/tests/helpers'
import Popover from '.'

describe('<Popover/>', () => {
  it('should render popover', () => {
    render(<Popover title="Test title" items={['Item 1', 'Item 2']} />)
    expect(screen.getByText('Test title')).toBeInTheDocument()
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('should render popover styles correctly', () => {
    render(<Popover title="Test title" items={['Item 1', 'Item 2']} />)
    expect(screen.getByTestId('popoverContainer')).toHaveStyle({
      position: 'absolute',
      top: '0',
      left: '100%',
      width: '15rem',
      borderRadius: '1rem',
      marginLeft: '2rem'
    })
    expect(screen.getByTestId('popoverText')).toHaveStyle({
      position: 'relative',
      margin: '1rem',
      backgroundColor: 'white',
      color: theme.colors.mineShaft
    })
    expect(screen.getByTestId('popoverTextTitle')).toHaveStyle({
      fontSize: theme.font.sizes['desk-medium'],
      fontWeight: theme.font.semibold
    })
    expect(screen.getByTestId('popoverTextItems')).toHaveStyle({
      paddingTop: '4px',
      listStyle: 'inside'
    })
  })
})

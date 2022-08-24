import userEvent from '@testing-library/user-event'
import { render, screen } from 'utils/tests/helpers'
import Chip from './'

describe('<Chip />', () => {
  const textContent = 'conteúdo'

  it('should render text content passed as prop', () => {
    render(<Chip text={textContent} />)

    expect(screen.getByText(textContent)).toBeInTheDocument()
  })

  it('should not render close button when isClosable is not passed as a prop', () => {
    render(<Chip text={textContent} />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('should render close button when isClosable is true', () => {
    render(<Chip text={textContent} isClosable={true} />)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('should render background color according to backgroundColor prop', () => {
    render(<Chip text={textContent} backgroundColor="red" />)

    expect(screen.getByTestId('chip')).toHaveStyle('backgroundColor: red')
  })

  it('should render text color according to textColor prop', () => {
    render(<Chip text={textContent} textColor="red" />)

    expect(screen.getByText(textContent)).toHaveStyle('color: red')
  })

  it('should call onClose function when isClosable is true and close button is clicked', () => {
    const mockOnClose = jest.fn()

    render(<Chip text={textContent} isClosable onClose={mockOnClose} />)

    userEvent.click(screen.getByRole('button'))
    expect(mockOnClose).toHaveBeenCalled()
  })
})

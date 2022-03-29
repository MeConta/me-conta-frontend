import { render, screen } from '../../../utils/tests/helpers'
import { DatePicker } from './index'
import userEvent from '@testing-library/user-event'
import {
  ArrowIosBackOutline,
  ArrowIosForwardOutline
} from 'styled-icons/evaicons-outline'

describe('<DatePicker />', () => {
  beforeEach(() => {
    render(<DatePicker defaultMonth={new Date(2022, 3)} locale="en-EN" />)
  })
  it('should render DayPicker component', () => {
    expect(screen.getByText('March 2022')).toBeInTheDocument()
  })

  it('should render NavBar arrow buttons', () => {
    const backButton = screen.getByTestId('back-button')
    const forwardButton = screen.getByTestId('forward-button')

    expect(backButton).toBeInTheDocument()
    expect(forwardButton).toBeInTheDocument()

    userEvent.click(backButton)

    expect(screen.getByText('February 2022')).toBeInTheDocument()

    userEvent.click(forwardButton)

    expect(screen.getByText('March 2022')).toBeInTheDocument()
  })
})

import { render, screen } from '../../../utils/tests/helpers'
import { Sidebar } from './index'

describe('<Sidebar />', () => {
  const mockHandleCloseButton = jest.fn()

  const checkLinks = () => {
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('Clients')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  }

  it('should render Sidebar hided', () => {
    render(
      <Sidebar showSidebar={false} handleCloseButton={mockHandleCloseButton} />
    )
    expect(screen.getByTestId('sidebar-container')).toHaveStyle('width: 0')
    checkLinks()
  })

  it('should render Sidebar showed', () => {
    render(
      <Sidebar showSidebar={true} handleCloseButton={mockHandleCloseButton} />
    )
    expect(screen.getByTestId('sidebar-container')).toHaveStyle('width: 250px')
    checkLinks()
  })
})

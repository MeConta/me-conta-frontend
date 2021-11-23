import { render, screen } from '../../../utils/tests/helpers'
import { Avatar } from './index'
describe('<Avatar />', () => {
  describe('<Avatar /> with name', () => {
    beforeEach(() => {
      render(<Avatar name="Luvois Anedo Zaladar" />)
    })

    it('should render first and last name initials', () => {
      expect(screen.getByText('LZ')).toBeInTheDocument()
    })

    it('should not render the avatar image', () => {
      expect(screen.queryByRole('img')).not.toBeInTheDocument()
    })
  })

  describe('<Avatar /> with name and email', () => {
    beforeEach(() => {
      render(
        <Avatar
          name="Luvois Anedo Zaladar"
          email="jitewaboh@lagify.com"
          size={68}
          fontSize={24}
          backgroundColor="#F1FAFF"
          color="#009EF7"
        />
      )
    })

    it('should render first and last name initials', () => {
      expect(screen.getByText('LZ')).toBeInTheDocument()
    })

    it('should render the avatar image', () => {
      expect(screen.getByRole('img')).toBeInTheDocument()
    })

    it('should add alt text for avatar', () => {
      expect(screen.getByRole('img')).toHaveAttribute(
        'alt',
        'Avatar do Luvois Anedo Zaladar'
      )
    })

    it('should render the sizes correctly', () => {
      expect(screen.getByText('LZ')).toHaveStyle('fontSize: 24px')
      expect(screen.getByTestId('avatar')).toHaveStyle('width: 68px')
      expect(screen.getByTestId('avatar')).toHaveStyle('height: 68px')
    })

    it('should render the colors correctly', () => {
      expect(screen.getByText('LZ')).toHaveStyle('color: #009EF7')
      expect(screen.getByTestId('avatar')).toHaveStyle('background: #F1FAFF')
    })
  })
})

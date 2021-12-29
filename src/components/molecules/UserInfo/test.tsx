import { render, screen } from '../../../utils/tests/helpers'
import { UserInfo } from './index'
describe('<UserInfo />', () => {
  describe('<UserInfo /> without profile link', () => {
    it('should not render the profile link', () => {
      render(<UserInfo name="Luvois Anedo Zaladar" frentes={[0]} width={411} />)
      expect(screen.queryByRole('link')).not.toBeInTheDocument()
    })
  })

  describe('<UserInfo /> with profile link', () => {
    it('should render the profile link', () => {
      render(
        <UserInfo
          name="Luvois Anedo Zaladar"
          email="jitewaboh@lagify.com"
          profileLink="https://www.google.com"
          frentes={[0]}
          width={664}
        />
      )
      expect(screen.queryByRole('link')).toBeInTheDocument()
    })
  })
})

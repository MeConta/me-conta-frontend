import { render, screen } from '../../../utils/tests/helpers'
import Frentes from './index'
describe('<Frentes />', () => {
  describe('<Frentes /> with all frentes', () => {
    it('should render all frentes', () => {
      render(<Frentes frentes={[0, 1, 2]} />)
      expect(screen.getByText('Orientação vocacional')).toBeInTheDocument()
      expect(screen.getByText('Coaching de estudos')).toBeInTheDocument()
      expect(screen.getByText('Acolhimento')).toBeInTheDocument()
    })
  })

  describe('<Frentes /> with orientação vocacional only', () => {
    it('should render all frentes', () => {
      render(<Frentes frentes={[0]} />)
      expect(screen.getByText('Orientação vocacional')).toBeInTheDocument()
    })
  })

  describe('<Frentes /> with coaching de estudos only', () => {
    it('should render all frentes', () => {
      render(<Frentes frentes={[1]} />)
      expect(screen.getByText('Coaching de estudos')).toBeInTheDocument()
    })
  })

  describe('<Frentes /> with acolhimento only', () => {
    it('should render all frentes', () => {
      render(<Frentes frentes={[2]} />)
      expect(screen.getByText('Acolhimento')).toBeInTheDocument()
    })
  })
})

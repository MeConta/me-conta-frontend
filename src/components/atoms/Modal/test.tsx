import { render, screen, waitFor } from '../../../utils/tests/helpers'
import Modal from '.'
import userEvent from '@testing-library/user-event'

const MODAL_CONTENT = () => {
  return (
    <div>
      <h1>Title</h1>
      <p>My body </p>
      <button title="button1" />
    </div>
  )
}

describe('<Modal />', () => {
  describe('when isEnabled prop is true', () => {
    beforeEach(() => {
      render(<Modal isEnabled={true}>{MODAL_CONTENT}</Modal>)
    })

    it('should apply modal styles', () => {
      const modal = screen.getByRole('modal')

      expect(modal).toHaveStyle(
        ` background-color: rgba(0, 0, 0, 0.25);
          position: fixed;
          top: 0;
          z-index: 1;
          height: 100%;
          `
      )
    })
  })
})

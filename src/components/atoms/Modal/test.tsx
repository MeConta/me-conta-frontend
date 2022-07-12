import { render, screen, waitFor, within } from '../../../utils/tests/helpers'
import Modal from '.'
import userEvent from '@testing-library/user-event'

const MODAL_CONTENT = () => {
  return (
    <div>
      <h1>Title</h1>
      <p>My body</p>
      <button title="cancelar" />
      <button title="confirmar" />
    </div>
  )
}

const modalProps = {
  isEnable: true
}

describe('<Modal />', () => {
  describe('when isEnabled prop is true', () => {
    beforeEach(() => {
      render(<Modal isEnabled={modalProps.isEnable}>{MODAL_CONTENT()}</Modal>)
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

    it('should render Modal with a title, body and button', () => {
      expect(screen.getByText('Title')).toBeInTheDocument()
      expect(screen.getByText('My body')).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: 'cancelar' })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('button', { name: 'confirmar' })
      ).toBeInTheDocument()
    })

    it('should render a container with a close button', () => {
      const container = screen.getByTestId('modal-container')

      expect(container).toBeInTheDocument()
      // expect(container).toHaveStyle(
      //   `
      //     width: ${modalProps.width};
      //     height: ${modalProps.height};
      //   `
      // )
    })
  })

  describe('when isEnabled prop is false', () => {
    beforeEach(() => {
      render(<Modal isEnabled={false}>{MODAL_CONTENT()}</Modal>)
    })

    it('shouldnt render Modal', () => {
      expect(screen.queryByRole('modal')).not.toBeInTheDocument()
    })
  })
})

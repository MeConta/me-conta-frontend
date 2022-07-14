import { render, screen, within } from '../../../utils/tests/helpers'
import Modal from '.'

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
  isEnable: true,
  width: '430px',
  height: '332px'
}

const onCloseMock = jest.fn()

describe('<Modal />', () => {
  describe('when isEnabled prop is true', () => {
    beforeEach(() => {
      render(
        <Modal
          isEnabled={modalProps.isEnable}
          width={modalProps.width}
          height={modalProps.height}
          funcCloseButton={onCloseMock}
        >
          {MODAL_CONTENT()}
        </Modal>
      )
    })

    it('should apply background modal styles', () => {
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

    it('should render Modal with a title, body and buttons', () => {
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
      const container = screen.getByTestId('content-container')
      const closeButton = within(container).getByTestId('close')

      expect(container).toBeInTheDocument()
      expect(container).toHaveStyle(
        `
          width: ${modalProps.width};
          height: ${modalProps.height};
        `
      )
      expect(closeButton).toBeInTheDocument()
    })

    it('should call function onCloseMock and close modal when closeButton is clicked', async () => {
      screen.getByTestId('close').click()
      expect(onCloseMock).toHaveBeenCalled()
      expect(screen.queryByRole('modal')).not.toBeInTheDocument()
    })
  })

  describe('when isEnabled prop is false', () => {
    it('shouldnt render Modal', () => {
      render(<Modal isEnabled={false} funcCloseButton={onCloseMock}>{MODAL_CONTENT()}</Modal>)
      expect(screen.queryByRole('modal')).not.toBeInTheDocument()
    })
  })
})

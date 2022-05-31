import { render, screen, waitFor } from '../../../utils/tests/helpers'
import ConfirmationDialog from '.'
import userEvent from '@testing-library/user-event'
import router from '../../../../__mocks__/next/router'

describe('<ConfirmationDialog />', () => {
  const buttonText = 'texto botão'

  it('should render ConfirmationDialog with a title and button', () => {
    render(
      <ConfirmationDialog
        logoSrc="/teste.png"
        buttonText={buttonText}
        title={'Título'}
      />
    )

    expect(screen.getByText('Título')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: buttonText })).toBeInTheDocument()
  })

  it('should render ConfirmationDialog with a decorated title', () => {
    const { container } = render(
      <ConfirmationDialog
        logoSrc="/teste.png"
        buttonText={buttonText}
        titleInfo={{ preText: 'Título', boldText: 'em destaque' }}
      />
    )

    expect(screen.getByText('Título')).toBeInTheDocument()
    expect(container.querySelector('b')).toHaveTextContent('em destaque')
  })

  it('should render ConfirmationDialog with a subtitle', () => {
    render(
      <ConfirmationDialog
        logoSrc="/teste.png"
        buttonText={buttonText}
        subtitle="Subtítulo"
      />
    )

    expect(screen.getByText('Subtítulo')).toBeInTheDocument()
  })

  it('should render ConfirmationDialog with a decorated subtitle', () => {
    const { container } = render(
      <ConfirmationDialog
        logoSrc="/teste.png"
        buttonText={buttonText}
        subtitleInfo={{
          preText: 'Subtítulo',
          boldText: 'em destaque',
          posText: 'final'
        }}
      />
    )

    expect(screen.getByText(/Subtítulo/)).toBeInTheDocument()
    expect(container.querySelector('b')).toHaveTextContent('em destaque')
    expect(screen.getByText(/final/)).toBeInTheDocument()
  })

  it('should redirect to link when clicking on button', () => {
    render(
      <ConfirmationDialog
        logoSrc="/teste.png"
        buttonText={buttonText}
        buttonLink="/rota-teste"
      />
    )

    userEvent.click(screen.getByRole('button', { name: buttonText }))

    expect(router.push).toHaveBeenCalledWith('/rota-teste')
  })

  it('should redirect to home when clicking on button if no buttonLink is provided', () => {
    render(<ConfirmationDialog logoSrc="/teste.png" buttonText={buttonText} />)

    userEvent.click(screen.getByRole('button', { name: buttonText }))

    expect(router.push).toHaveBeenCalledWith('/')
  })

  it('should close the dialog after clicking in close button', async () => {
    render(
      <ConfirmationDialog
        logoSrc="/teste.png"
        buttonText={buttonText}
        buttonLink="/rota-teste"
        isModal={true}
        isClosable={true}
      />
    )
    userEvent.click(screen.getByTestId('close'))

    expect(await screen.findByTestId('empty')).toBeInTheDocument()
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  describe('when isModal prop is true', () => {
    beforeEach(() => {
      render(
        <ConfirmationDialog
          logoSrc="/teste.png"
          buttonText={buttonText}
          buttonLink="/rota-teste"
          isModal={true}
          isClosable
        />
      )
    })

    it('should apply modal styles', () => {
      expect(screen.getByTestId('confirmation-dialog')).toHaveStyle(
        ` background-color: rgba(0, 0, 0, 0.25);
          position: fixed;
          top: 0;
          z-index: 40;
          height: 100%;
          `
      )
    })

    it('should focus on action button after performing two sequencial tab clicks, when the modal is closable', () => {
      userEvent.keyboard('Tab')
      expect(screen.getByTestId('close')).toHaveFocus()
      userEvent.keyboard('Tab')
      waitFor(() => {
        expect(screen.getByRole('link')).toHaveFocus()
      })
      userEvent.keyboard('Tab')
      waitFor(() => {
        expect(screen.getByRole('button', { name: buttonText })).toHaveFocus()
      })
    })

    it('should have necessary aria attributes', async () => {
      expect(await screen.findByRole('dialog')).toBeInTheDocument()
      const dialog = screen.getByRole('dialog')
      expect(dialog).toBeInTheDocument()
      expect(dialog).toHaveAttribute('aria-modal')
      expect(dialog).toHaveAttribute('aria-labelledby')
      expect(dialog).toHaveAttribute('aria-describedby')
    })
  })
})

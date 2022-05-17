import userEvent from '@testing-library/user-event'
import { IAuthService } from 'services/auth-services/auth-service'
import { render, screen, waitFor, within } from '../../utils/tests/helpers'
import NovaSenha from './[hash]'

jest.mock('store/auth-context', () => {
  const useAuthContext = () => {
    const authServiceMock: IAuthService = {
      resetarSenha: jest.fn(() => Promise.resolve()),
      logout: jest.fn()
    }

    return {
      handleLogin: jest.fn(),
      authService: authServiceMock
    }
  }
  return { useAuthContext }
})

jest.mock('services/toast-service/toast-service', () => {
  const useToast = () => {
    return { emit: jest.fn() }
  }
  return { useToast, ToastType: { SUCCESS: 'sucesso' } }
})

jest.mock('utils/toggles/toggles', () => {
  return { enablePasswordResetModal: true }
})

describe('nova senha page', () => {
  const VALID_HASH = 'ramdom123abcd'
  const VALID_PASSWORD = '123456W*abcd.#'

  const fillForm = () => {
    const newPasswordInput = screen.getByLabelText(/Nova senha/)
    const confirmNewPasswordInput =
      screen.getByLabelText(/Confirmar nova senha/)

    userEvent.type(newPasswordInput, VALID_PASSWORD)
    userEvent.type(confirmNewPasswordInput, VALID_PASSWORD)
  }

  it('should show modal when password reset is successful', async () => {
    render(<NovaSenha hash={VALID_HASH} />)

    fillForm()

    userEvent.click(
      screen.getByRole('button', { name: /Redefinir minha senha/i })
    )

    await waitFor(() => {
      expect(screen.getByText(/Sua senha foi redefinida/i)).toBeInTheDocument()
    })
  })

  it('should keep focus inside modal', async () => {
    render(<NovaSenha hash={VALID_HASH} />)

    fillForm()

    userEvent.click(
      screen.getByRole('button', { name: /Redefinir minha senha/i })
    )

    await waitFor(() => {
      expect(screen.getByText(/Sua senha foi redefinida/i)).toBeInTheDocument()
    })

    const modal = screen.getByRole('dialog')

    expect(within(modal).getByRole('button')).toHaveFocus()
    userEvent.keyboard('Tab')
    expect(within(modal).getByRole('button')).toHaveFocus()
  })
})

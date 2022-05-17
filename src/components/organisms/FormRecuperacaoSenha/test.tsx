import userEvent from '@testing-library/user-event'
import React from 'react'
import { IAuthService } from 'services/auth-services/auth-service'
import { fireEvent, render, screen, waitFor } from 'utils/tests/helpers'
import { FormRecuperacaoSenha } from '.'

describe('<FormRecuperacaoSenha />', () => {
  const handleSuccessMock = jest.fn()
  const handleErrorMock = jest.fn()
  const authServiceMock: IAuthService = {
    logout: jest.fn(),
    login: jest.fn(),
    recuperarSenha: jest.fn()
  }

  const elements = () => {
    return {
      email: screen.getByLabelText('E-mail'),
      button: screen.getByRole('button')
    }
  }

  beforeEach(() => {
    render(
      <FormRecuperacaoSenha
        authService={authServiceMock}
        handleSuccess={handleSuccessMock}
        handleError={handleErrorMock}
      />
    )
  })

  it('deve renderizar os elementos', () => {
    const { email, button } = elements()
    expect(email).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('deve exibir error de email inválido', async () => {
    const email = screen.getByRole('textbox', { name: 'E-mail' })
    userEvent.type(email, 'meuemailcom')
    const button = screen.getByRole('button')
    fireEvent.click(button)
    await waitFor(() => {
      expect(screen.getByText(/E-mail inválido/)).toBeInTheDocument()
    })
  })

  it('deve submeter formulário e chamar callback de sucesso', async () => {
    const { email, button } = elements()
    userEvent.type(email, 'meuemail@email.com')
    fireEvent.click(button)

    jest
      .spyOn(authServiceMock, 'recuperarSenha')
      .mockImplementation(() => Promise.resolve())

    await waitFor(() => {
      expect(authServiceMock.recuperarSenha).toBeCalled()
      expect(handleSuccessMock).toBeCalled()
    })
  })

  it('deve submeter formulário e chamar callback de error', async () => {
    const { email, button } = elements()
    userEvent.type(email, 'meuemail@email.com')
    fireEvent.click(button)

    jest.spyOn(authServiceMock, 'recuperarSenha').mockImplementation(() =>
      Promise.reject({
        code: 500,
        message: 'mensagem de erro'
      })
    )

    await waitFor(() => {
      expect(authServiceMock.recuperarSenha).toBeCalled()
      expect(handleErrorMock).toBeCalled()
    })
  })

  it('deve exibir erro quando o email enviado não é encontrado no sistema', async () => {
    const email = screen.getByRole('textbox', { name: 'E-mail' })
    userEvent.type(email, 'emailnaoexistente@gmail.com')
    const button = screen.getByRole('button')

    jest.spyOn(authServiceMock, 'recuperarSenha').mockImplementation(() =>
      Promise.reject({
        response: {
          data: {
            code: 404,
            message: 'mensagem de erro'
          }
        }
      })
    )

    fireEvent.click(button)

    await waitFor(() => {
      expect(screen.getByText('E-mail inválido')).toBeInTheDocument()
    })
  })
})

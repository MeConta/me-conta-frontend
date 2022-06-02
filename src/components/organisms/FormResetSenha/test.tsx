import userEvent from '@testing-library/user-event'
import React from 'react'
import { IAuthService } from 'services/auth-services/auth-service'
import { fireEvent, render, screen, waitFor } from 'utils/tests/helpers'
import { FormResetSenha } from '.'

describe('<FormResetSenha />', () => {
  const handleSuccessMock = jest.fn()
  const handleErrorMock = jest.fn()
  const hashMock = 'djasi-dbfi#$!-S@AFDB'
  const authServiceMock: IAuthService = {
    login: jest.fn(),
    resetarSenha: jest.fn()
  }

  const elements = () => {
    return {
      password: screen.getByRole('password', { name: 'Nova senha' }),
      confirm: screen.getByRole('password', { name: 'Confirmar nova senha' }),
      button: screen.getByRole('button')
    }
  }

  beforeEach(() => {
    render(
      <FormResetSenha
        hash={hashMock}
        authService={authServiceMock}
        handleSuccess={handleSuccessMock}
        handleError={handleErrorMock}
      />
    )
  })

  it('deve renderizar os elementos', () => {
    const { password, confirm, button } = elements()
    expect(password).toBeInTheDocument()
    expect(confirm).toBeInTheDocument()
    expect(button).toBeInTheDocument()
  })

  it('deve submeter formulário e chamar callback de sucesso', async () => {
    const { password, confirm, button } = elements()
    userEvent.type(password, '123849uiwebfiue%$#A')
    userEvent.type(confirm, '123849uiwebfiue%$#A')
    fireEvent.click(button)

    jest
      .spyOn(authServiceMock, 'resetarSenha')
      .mockImplementation(() => Promise.resolve())

    await waitFor(() => {
      expect(authServiceMock.resetarSenha).toBeCalled()
      expect(handleSuccessMock).toBeCalled()
    })
  })

  it('deve submeter formulário e chamar callback de error', async () => {
    const { password, confirm, button } = elements()
    userEvent.type(password, '123849uiwebfiue%$#A')
    userEvent.type(confirm, '123849uiwebfiue%$#A')
    fireEvent.click(button)

    jest
      .spyOn(authServiceMock, 'resetarSenha')
      .mockImplementation(() => Promise.reject())

    await waitFor(() => {
      expect(authServiceMock.resetarSenha).toBeCalled()
      expect(handleErrorMock).toBeCalled()
    })
  })

  it('deve exibir error de senha fraca', async () => {
    const { button, password } = elements()
    userEvent.type(password, 'AAA%$#A')
    fireEvent.click(button)

    expect(
      await screen.findByText(/A senha deve atender aos requisitos mínimos/)
    ).toBeInTheDocument()
  })

  it('deve exibir error de campos obrigatorios', async () => {
    const { button } = elements()
    fireEvent.click(button)
    await waitFor(() => {
      expect(screen.getByText(/A senha é obrigatória/)).toBeInTheDocument()
      expect(
        screen.getByText(/A confirmação de senha é obrigatória/)
      ).toBeInTheDocument()
    })
  })

  it('deve exibir error de senhas diferentes', async () => {
    const { button, password, confirm } = elements()
    userEvent.type(password, '123849uiwebfiue%$#A')
    userEvent.type(confirm, 'diferente')
    fireEvent.click(button)
    await waitFor(() => {
      expect(screen.getByText(/As senhas devem ser iguais/)).toBeInTheDocument()
    })
  })
})

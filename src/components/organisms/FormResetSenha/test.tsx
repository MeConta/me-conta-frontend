import userEvent from '@testing-library/user-event'
import React from 'react'
import { IAuthService } from 'services/auth-services/auth-service'
import { fireEvent, render, screen, waitFor } from 'utils/tests/helpers'
import { FormResetSenha } from '.'

describe('<FormAluno />', () => {
  const handleSuccessMock = jest.fn()
  const handleErrorMock = jest.fn()
  const hashMock = 'djasi-dbfi#$!-S@AFDB'
  const authServiceMock: IAuthService = {
    login: jest.fn(),
    resetarSenha: jest.fn()
  }

  const elements = () => {
    return {
      password: screen.getByRole('password', { name: 'Senha' }),
      confirm: screen.getByRole('password', { name: 'Confirmar Senha' }),
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
})

import userEvent from '@testing-library/user-event'
import React from 'react'
import { render, screen, waitFor } from 'utils/tests/helpers'
import { FormCadastro, TYPES } from '.'
import { fireEvent } from '@testing-library/dom'
import {
  ISignupService,
  SignupError
} from '../../../services/signup-service/signup-service'

describe('<FormCadastro/>', () => {
  const signupServiceMock: ISignupService = {
    initialSignup: jest.fn()
  }
  const handleSuccessMock = jest.fn()
  const handleErrorMock = jest.fn()

  const elements = () => {
    const email = screen.getByRole('textbox', { name: 'E-mail' })
    const password = screen.getByRole('password', { name: 'Password' })
    const confirm = screen.getByRole('password', { name: 'Confirmar Password' })
    const tipo = screen.getByLabelText(TYPES.ALUNO)
    const button = screen.getByRole('button')

    return {
      email,
      password,
      confirm,
      tipo,
      button
    }
  }

  beforeEach(() => {
    render(
      <FormCadastro
        signupService={signupServiceMock}
        handleSuccess={handleSuccessMock}
        handleError={handleErrorMock}
      />
    )
  })

  it('deve renderizar o formulario de cadastro ', async () => {
    const { email, password, confirm, tipo } = elements()

    expect(email).toBeInTheDocument()
    expect(password).toBeInTheDocument()
    expect(confirm).toBeInTheDocument()
    expect(tipo).toBeInTheDocument()
  })
  it('deve exibir erro de email inválido', async () => {
    const email = screen.getByRole('textbox', { name: 'E-mail' })
    await userEvent.type(email, 'email')

    await waitFor(() => {
      expect(screen.getByText(/E-mail inválido/)).toBeInTheDocument()
    })
  })
  it('deve exibir erro de senha inválido', async () => {
    const { password } = elements()
    await userEvent.type(password, 'senha')

    await waitFor(() => {
      expect(screen.getByText(/A senha deve ser forte/)).toBeInTheDocument()
    })
  })
  it('deve exibir erro de senhas diferentes', async () => {
    const { password, confirm } = elements()

    await userEvent.type(password, 'senha')
    await userEvent.type(confirm, 'not-senha')

    await waitFor(() => {
      expect(screen.getByText(/As senhas devem ser iguais/)).toBeInTheDocument()
    })
  })
  it('deve chamar o signup service com sucesso', async () => {
    const { email, password, confirm, tipo, button } = elements()

    await userEvent.type(email, 'teste@teste.com')
    await userEvent.type(password, '!@#ASD!@#AASASD')
    await userEvent.type(confirm, '!@#ASD!@#AASASD')
    await fireEvent.click(tipo)
    await fireEvent.click(button)

    await waitFor(() => {
      expect(signupServiceMock.initialSignup).toBeCalledWith({
        email: 'teste@teste.com',
        password: '!@#ASD!@#AASASD',
        tipo: TYPES.ALUNO
      })
      expect(handleSuccessMock).toBeCalled()
    })
  })
  it('deve dar erro ao chamar o signup service', async () => {
    jest
      .spyOn(signupServiceMock, 'initialSignup')
      .mockImplementation(() =>
        Promise.reject(new SignupError('409', 'mensagem de erro'))
      )
    const { email, password, confirm, tipo, button } = elements()

    await userEvent.type(email, 'teste@teste.com')
    await userEvent.type(password, '!@#ASD!@#AASASD')
    await userEvent.type(confirm, '!@#ASD!@#AASASD')
    await fireEvent.click(tipo)
    await fireEvent.click(button)

    await waitFor(() => {
      expect(handleErrorMock).toBeCalled()
    })
  })
})

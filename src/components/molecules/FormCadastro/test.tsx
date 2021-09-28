import userEvent from '@testing-library/user-event'
import React from 'react'
import { render, screen, waitFor } from 'utils/tests/helpers'
import { FormCadastro, TYPES } from '.'
import { fireEvent } from '@testing-library/dom'
import { SignupService } from '../../../services/signup-service/signup-service'

describe('<FormCadastro/>', () => {
  const signupServiceMock: SignupService = {
    initialSignup: jest.fn()
  }
  it('deve renderizar o formulario de cadastro ', async () => {
    render(<FormCadastro signupService={signupServiceMock} />)

    const email = screen.getByRole('textbox', { name: 'E-mail' })
    const password = screen.getByRole('password', { name: 'Password' })
    const passwordConfirm = screen.getByRole('password', {
      name: 'Confirmar Password'
    })
    const tipo = screen.getByLabelText(TYPES.ALUNO)

    expect(email).toBeInTheDocument()
    expect(password).toBeInTheDocument()
    expect(passwordConfirm).toBeInTheDocument()
    expect(tipo).toBeInTheDocument()
  })
  it('deve exibir erro de email inválido', async () => {
    render(<FormCadastro signupService={signupServiceMock} />)
    const email = screen.getByRole('textbox', { name: 'E-mail' })
    await userEvent.type(email, 'email')

    await waitFor(() => {
      expect(screen.getByText(/E-mail inválido/)).toBeInTheDocument()
    })
  })
  it('deve exibir erro de senha inválido', async () => {
    render(<FormCadastro signupService={signupServiceMock} />)
    const password = screen.getByRole('password', { name: 'Password' })
    await userEvent.type(password, 'senha')

    await waitFor(() => {
      expect(screen.getByText(/A senha deve ser forte/)).toBeInTheDocument()
    })
  })
  it('deve exibir erro de senhas diferentes', async () => {
    render(<FormCadastro signupService={signupServiceMock} />)
    const password = screen.getByRole('password', { name: 'Password' })
    const confirm = screen.getByRole('password', { name: 'Confirmar Password' })

    await userEvent.type(password, 'senha')
    await userEvent.type(confirm, 'not-senha')

    await waitFor(() => {
      expect(screen.getByText(/As senhas devem ser iguais/)).toBeInTheDocument()
    })
  })
  it('deve chamar o signup service', async () => {
    render(<FormCadastro signupService={signupServiceMock} />)
    const email = screen.getByRole('textbox', { name: 'E-mail' })
    const password = screen.getByRole('password', { name: 'Password' })
    const confirm = screen.getByRole('password', { name: 'Confirmar Password' })
    const tipo = screen.getByLabelText(TYPES.ALUNO)
    const button = screen.getByRole('button')

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
    })
  })
})

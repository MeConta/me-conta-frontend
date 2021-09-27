import userEvent from '@testing-library/user-event'
import React from 'react'
import { render, screen, waitFor } from 'utils/tests/helpers'
import { FormCadastro } from '.'

describe('<FormCadastro/>', () => {
  it('deve renderizar o formulario de cadastro ', async () => {
    render(<FormCadastro />)

    const email = screen.getByRole('textbox', { name: 'E-mail' })
    const password = screen.getByRole('password', { name: 'Password' })
    const passwordConfirm = screen.getByRole('password', {
      name: 'Confirmar Password'
    })
    const tipo = screen.getByLabelText('Aluno')

    expect(email).toBeInTheDocument()
    expect(password).toBeInTheDocument()
    expect(passwordConfirm).toBeInTheDocument()
    expect(tipo).toBeInTheDocument()
  })
  it('deve exibir erro de email inválido', async () => {
    render(<FormCadastro />)
    const email = screen.getByRole('textbox', { name: 'E-mail' })
    await userEvent.type(email, 'email')

    await waitFor(() => {
      expect(screen.getByText(/E-mail inválido/)).toBeInTheDocument()
    })
  })
  it('deve exibir erro de senha inválido', async () => {
    render(<FormCadastro />)
    const email = screen.getByRole('textbox', { name: 'E-mail' })
    await userEvent.type(email, 'email')

    await waitFor(() => {
      expect(screen.getByText(/E-mail inválido/)).toBeInTheDocument()
    })
  })
})

import React from 'react'
import { render, screen } from 'utils/tests/helpers'
import { FormCadastro } from '.'

describe('<FormCadastro/>', () => {
  it('deve renderizar o formulario de cadastro ', async () => {
    const { container } = render(<FormCadastro />)

    const email = screen.getByRole('textbox', { name: 'E-mail' })
    const password = screen.getByRole('password', { name: 'Password' })
    const tipo = screen.getByLabelText('Aluno')

    expect(email).toBeInTheDocument()
    expect(password).toBeInTheDocument()
    expect(tipo).toBeInTheDocument()

    // expect(container.parentElement).toMatchSnapshot()
  })
})

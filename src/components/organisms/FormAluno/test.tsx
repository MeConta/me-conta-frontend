import { render, screen } from 'utils/tests/helpers'
import FormAluno from './index'
import { fireEvent } from '@testing-library/dom'
import React from 'react'
import { redirect } from 'next/dist/next-server/server/api-utils'

describe('<FormAluno />', () => {
  beforeEach(() => {
    render(<FormAluno />)
  })

  it('deve renderizar o formulário de aluno', () => {
    const nome = screen.getByRole('textbox', {
      name: 'Nome Completo'
    })
    const telefone = screen.getByTestId('phone-number')
    const dataNascimento = screen.getByLabelText('Data de nascimento')
    const cidade = screen.getByLabelText('Cidade')
    const estado = screen.getByLabelText('Estado')
    const genero = screen.getByText('Gênero')
    const escolaridade = screen.getByLabelText('Escolaridade')
    const tipoEscola = screen.getByText('Tipo de Escola')

    expect(nome).toBeInTheDocument()
    expect(telefone).toBeInTheDocument()
    expect(dataNascimento).toBeInTheDocument()
    expect(cidade).toBeInTheDocument()
    expect(estado).toBeInTheDocument()
    expect(genero).toBeInTheDocument()
    expect(escolaridade).toBeInTheDocument()
    expect(tipoEscola).toBeInTheDocument()
  })

  // it('deve redirecionar para a página inicial', () => {
  //   const link = screen.getByRole('link')
  //   fireEvent.click(link)
  //   expect(redirect.next()).toBeCalled()
  // })
})

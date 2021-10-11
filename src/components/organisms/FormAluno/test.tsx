import { render, screen, waitFor } from 'utils/tests/helpers'
import FormAluno from './index'
import { fireEvent } from '@testing-library/dom'
import React from 'react'
import userEvent from '@testing-library/user-event'
import { ISignupAlunoService } from '../../../services/signup-aluno-service/signup-aluno-service'

describe('<FormAluno />', () => {
  const signupServiceMock: ISignupAlunoService = {
    alunoSignup: jest.fn()
  }

  beforeEach(() => {
    render(<FormAluno alunoSignup={signupServiceMock} />)
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

  it('deve chamar o signup service com sucesso', async () => {
    const nome = screen.getByRole('textbox', {
      name: 'Nome Completo'
    })
    const telefone = screen.getByTestId('phone-number')
    const dataNascimento = screen.getByLabelText('Data de nascimento')
    const cidade = screen.getByLabelText('Cidade')
    const estado = screen.getByLabelText('Estado')
    const genero = screen.getByLabelText('Masculino')
    const escolaridade = screen.getByLabelText('Escolaridade')
    const tipoEscola = screen.getByLabelText('Escola Pública')
    const button = screen.getByRole('button')

    await userEvent.type(nome, 'Nome')
    await fireEvent.change(telefone, { target: { value: '93234566543' } })
    await fireEvent.change(dataNascimento, { target: { value: '1992-01-18' } })
    await userEvent.type(cidade, 'Araxá')
    await fireEvent.change(estado, { target: { value: 'MG' } })
    await fireEvent.change(escolaridade, { target: { value: '1' } })
    await fireEvent.click(genero)
    await fireEvent.click(tipoEscola)
    await fireEvent.click(button)

    await waitFor(async () => {
      await expect(signupServiceMock.alunoSignup).toBeCalledWith({
        name: 'Nome',
        telefone: '93234566543',
        dataNascimento: '1992-01-18',
        cidade: 'Araxá',
        estado: 'MG',
        genero: 'M',
        escolaridade: 1,
        tipoEscola: 0
      })
    })
  })
})

import { render, screen } from 'utils/tests/helpers'
import FormAluno from './index'

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

    expect(nome).toBeInTheDocument()
    expect(telefone).toBeInTheDocument()
    expect(dataNascimento).toBeInTheDocument()
    expect(cidade).toBeInTheDocument()
    expect(estado).toBeInTheDocument()
    expect(genero).toBeInTheDocument()
  })
})

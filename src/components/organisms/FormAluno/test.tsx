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

    expect(nome).toBeInTheDocument()
  })
})

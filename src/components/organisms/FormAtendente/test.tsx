import { ISignupService } from 'services/signup-service/signup-service'
import { render, screen } from 'utils/tests/helpers'
import { FormAtendente } from '.'

describe('<FormAtendente/>', () => {
  const signupServiceMock: ISignupService = {
    initialSignup: jest.fn()
  }

  const getAllElements = () => {
    return {
      dataNascimento: screen.getByLabelText('Data de nascimento'),
      cidade: screen.getByRole('textbox', {
        name: 'Cidade'
      })
    }
  }

  beforeEach(() => {
    render(<FormAtendente signupService={signupServiceMock} />)
  })

  it('deve renderizar o formulário de atendimento', () => {
    const { dataNascimento, cidade } = getAllElements()
    expect(dataNascimento).toBeInTheDocument()
    expect(cidade).toBeInTheDocument()
  })
})

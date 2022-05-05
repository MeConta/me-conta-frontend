import { render, act, screen } from '../../../utils/tests/helpers'
import FormDadosAcademicos from '.'
import userEvent from '@testing-library/user-event'
import { fireEvent } from '@testing-library/dom'
import { PassosCadastro } from 'enums/passos-cadastro.enum'
import moment from 'moment'
import { ISignupVoluntarioService } from 'services/signup-voluntario-service/signup-voluntario-service'

describe('<FormDadosAcademicos />', () => {
  const setCurrentStepMock = jest.fn()
  const handleError = jest.fn()
  const handleSuccess = jest.fn()
  const setPreviousValuesMock = jest.fn()

  const signupServiceMock: ISignupVoluntarioService = {
    voluntarioSignUp: jest.fn()
  }

  const initialValues = {
    instituicao: '',
    anoFormacao: +moment().format('YYYY'),
    semestre: 1,
    nivelDeFormacao: 1,
    especializacoes: '',
    bio: '',
    crp: '',
    areaAtuacao: '',
    abordagem: '',
    frenteAtuacao: []
  }

  const elements = () => {
    return {
      instituicaoEnsino: screen.getByLabelText('Instituição de Ensino'),
      superiorEmAndamento: screen.getByText('Superior em Andamento'),
      superiorCompleto: screen.getByText('Superior Completo'),
      semestre: screen.getByRole('spinbutton', { name: /semestre/i }),
      frentesAtuacao: screen.getByText('Sessões de acolhimento dos estudantes'),
      descricao: screen.getByRole('textbox', {
        name: /breve descrição sobre você/i
      }),
      buttonVoltar: screen.getByRole('button', { name: /Voltar/ })
    }
  }

  const fillForm = async () => {
    const {
      instituicaoEnsino,
      semestre,
      frentesAtuacao,
      descricao,
      superiorEmAndamento,
      superiorCompleto
    } = elements()

    await act(async () => {
      fireEvent.change(instituicaoEnsino, { target: { value: 'UFRJ' } })
      fireEvent.change(semestre, { target: { value: 1 } })
      fireEvent.change(descricao, { target: { value: 'Teste' } })
    })

    userEvent.click(screen.getByRole('checkbox', { name: /acolhimento/ }))
    userEvent.click(screen.getByRole('checkbox', { name: /rotina/ }))

    return {
      instituicaoEnsino,
      semestre,
      frentesAtuacao,
      descricao,
      superiorEmAndamento,
      superiorCompleto
    }
  }

  beforeEach(() => {
    render(
      <FormDadosAcademicos
        signupVoluntarioService={signupServiceMock}
        setCurrentStep={setCurrentStepMock}
        handleSuccess={handleSuccess}
        handleError={handleError}
        setPreviousValues={setPreviousValuesMock}
        previousValues={undefined}
      />
    )
  })

  it('deve chamar o passo anterior do cadastro ao clicar no botão Voltar', async () => {
    const { buttonVoltar } = elements()

    await act(async () => {
      userEvent.click(buttonVoltar)
    })

    expect(setCurrentStepMock).toHaveBeenCalledWith(
      PassosCadastro.DADOS_PESSOAIS
    )
  })

  it('deve salvar informações já preenchidas, ao clicar no botão Voltar', async () => {
    const { buttonVoltar } = elements()
    await fillForm()

    await act(async () => {
      userEvent.click(buttonVoltar)
    })

    expect(setPreviousValuesMock).toHaveBeenCalledWith({
      ...initialValues,
      instituicao: 'UFRJ',
      semestre: 1,
      frenteAtuacao: [0, 1],
      bio: 'Teste'
    })
  })
})

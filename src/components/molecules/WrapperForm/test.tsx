import { render, screen } from '../../../utils/tests/helpers'
import { WrapperForm } from '.'
import { UserType } from 'enums/user-type.enum'
import { PassosCadastro } from 'enums/passos-cadastro.enum'

describe('<WrapperForm />', () => {
  const content = <div data-testid="form-content"></div>

  it('should render content and Me Conta logo', () => {
    render(<WrapperForm logoSrc="/mockimage.png">{content}</WrapperForm>)

    expect(
      screen.getByRole('img', { name: 'Logo Me Conta' })
    ).toBeInTheDocument()
    expect(screen.getByTestId('form-content')).toBeInTheDocument()
  })

  it('should render title passed to the wrapper', () => {
    render(
      <WrapperForm
        title={<h1>Título do Formulário</h1>}
        logoSrc="/mockimage.png"
      >
        {content}
      </WrapperForm>
    )

    expect(
      screen.getByRole('heading', { name: 'Título do Formulário' })
    ).toBeInTheDocument()
  })

  it('should not render NavigationLocation component when prop passoCadastro is not passed', () => {
    render(
      <WrapperForm tipoDeUsuario={UserType.ALUNO} logoSrc="/mockimage.png">
        {content}
      </WrapperForm>
    )

    expect(screen.queryByTestId('navigationContainer')).not.toBeInTheDocument()
  })

  it('should not render NavigationLocation component when prop tipoDeUsuario is not passed', () => {
    render(
      <WrapperForm
        passoCadastro={PassosCadastro.CRIAR_CONTA}
        logoSrc="/mockimage.png"
      >
        {content}
      </WrapperForm>
    )

    expect(screen.queryByTestId('navigationContainer')).not.toBeInTheDocument()
  })

  it('should render NavigationLocation component when passoCadastro and tipoDeUsuario are present', () => {
    render(
      <WrapperForm
        passoCadastro={PassosCadastro.CRIAR_CONTA}
        tipoDeUsuario={UserType.ALUNO}
        logoSrc="/mockimage.png"
      >
        {content}
      </WrapperForm>
    )

    expect(screen.getByTestId('navigationContainer')).toBeInTheDocument()
  })

  it('should render action items when they are passed', () => {
    render(
      <WrapperForm
        passoCadastro={PassosCadastro.CRIAR_CONTA}
        tipoDeUsuario={UserType.ALUNO}
        logoSrc="/mockimage.png"
        actionItems={[
          <button key="0">edit</button>,
          <button key="1">close</button>
        ]}
      >
        {content}
      </WrapperForm>
    )

    expect(screen.getByRole('button', { name: 'edit' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'close' })).toBeInTheDocument()
  })
})

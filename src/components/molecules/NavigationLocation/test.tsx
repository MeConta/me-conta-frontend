import { render, screen } from 'utils/tests/helpers'

import NavigationLocation from '.'
import { PassosCadastro } from 'enums/passos-cadastro.enum'
import { UserType } from 'enums/user-type.enum'

describe('<NavigationLocation/>', () => {
  it('should render the component as expected', () => {
    render(
      <NavigationLocation
        passo={PassosCadastro.CRIAR_CONTA}
        tipoDeUsuario={UserType.ALUNO}
      ></NavigationLocation>
    )

    const navigationContainer = screen.getByTestId('navigationContainer')
    expect(navigationContainer).toBeInTheDocument()
    const circleContainers = screen.getAllByTestId('circleContainer')
    expect(circleContainers.length).toBe<number>(3)
    circleContainers.forEach((element: HTMLElement | SVGElement | null) => {
      expect(navigationContainer).toContainElement(element)
    })
    expect(navigationContainer).toContainElement(
      screen.getByTestId('lineDadosPessoais')
    )
    expect(navigationContainer).toContainElement(
      screen.getByTestId('lineDadosAcademicos')
    )
  })

  it('should render text "Dados escolares" when user type is "Aluno" ', () => {
    render(
      <NavigationLocation
        passo={PassosCadastro.CRIAR_CONTA}
        tipoDeUsuario={UserType.ALUNO}
      ></NavigationLocation>
    )

    expect(screen.getByTestId('navigationContainer')).toHaveTextContent(
      'Dados da conta'
    )
    expect(screen.getByTestId('navigationContainer')).toHaveTextContent(
      'Dados pessoais'
    )
    expect(screen.getByTestId('navigationContainer')).toHaveTextContent(
      'Dados escolares'
    )
  })

  it('should render text "Dados acadêmicos" when user type is different from "Aluno"', () => {
    render(
      <NavigationLocation
        passo={PassosCadastro.CRIAR_CONTA}
        tipoDeUsuario={UserType.ATENDENTE}
      ></NavigationLocation>
    )

    expect(screen.getByTestId('navigationContainer')).toHaveTextContent(
      'Dados da conta'
    )
    expect(screen.getByTestId('navigationContainer')).toHaveTextContent(
      'Dados pessoais'
    )
    expect(screen.getByTestId('navigationContainer')).toHaveTextContent(
      'Dados acadêmicos'
    )
  })
})

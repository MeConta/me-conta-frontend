import { UserType } from 'enums/user-type.enum'
import CircleProgress from '../CircleProgress'
import { PersonCheckFill } from '@styled-icons/bootstrap'
import { TaskListLtr } from '@styled-icons/fluentui-system-filled'
import { MortarBoard } from '@styled-icons/octicons'
import * as S from './styles'
import { PassosCadastro } from 'enums/passos-cadastro.enum'

interface NavigationProp {
  passo: PassosCadastro
  tipoDeUsuario: UserType
}

export default function NavigationLocation({
  passo,
  tipoDeUsuario
}: NavigationProp) {
  return (
    <S.ComponentContainer>
      <CircleProgress
        active={true}
        displayLine={passo === PassosCadastro.CRIAR_CONTA}
        icon={<PersonCheckFill aria-label="Icone de criar conta" />}
        paddingLeft={'1rem'}
      >
        Dados da conta
      </CircleProgress>
      <S.Line active={passo >= PassosCadastro.DADOS_PESSOAIS}></S.Line>
      <CircleProgress
        active={passo >= PassosCadastro.DADOS_PESSOAIS}
        displayLine={passo <= PassosCadastro.DADOS_PESSOAIS}
        icon={<TaskListLtr aria-label="Icone de dados pessoais" />}
      >
        Dados pessoais
      </CircleProgress>
      <S.Line active={passo === PassosCadastro.DADOS_ACADEMICOS}></S.Line>
      <CircleProgress
        active={passo === PassosCadastro.DADOS_ACADEMICOS}
        displayLine={true}
        icon={<MortarBoard aria-label="Icone de dados acadêmicos" />}
        paddingLeft={'0.5rem'}
      >
        {tipoDeUsuario === UserType.ALUNO
          ? 'Dados escolares'
          : 'Dados acadêmicos'}
      </CircleProgress>
    </S.ComponentContainer>
  )
}

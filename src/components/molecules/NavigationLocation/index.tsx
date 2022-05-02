import { UserType } from 'enums/user-type.enum'
import CircleProgress from '../CircleProgress'
import { PersonCheckFill } from '@styled-icons/bootstrap'
import { TaskListLtr } from '@styled-icons/fluentui-system-filled'
import { MortarBoard } from '@styled-icons/octicons'
import * as S from './styles'

interface NavigationProp {
  passo: number
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
        displayLine={passo === 0}
        icon={<PersonCheckFill></PersonCheckFill>}
        paddingLeft={'1rem'}
      >
        Dados da conta
      </CircleProgress>
      <S.Line active={passo >= 1}></S.Line>
      <CircleProgress
        active={passo >= 1}
        displayLine={passo <= 1}
        icon={<TaskListLtr></TaskListLtr>}
      >
        Dados pessoais
      </CircleProgress>
      <S.Line active={passo === 2}></S.Line>
      <CircleProgress
        active={passo === 2}
        displayLine={true}
        icon={<MortarBoard></MortarBoard>}
        paddingLeft={'.5rem'}
      >
        {tipoDeUsuario === UserType.ALUNO
          ? 'Dados escolares'
          : 'Dados acadêmicos'}
      </CircleProgress>
    </S.ComponentContainer>
  )
}

import * as S from './styles'
import { UserInfo } from '../UserInfo'

export type CardScheduledSessionProps = {
  name: string
  email?: string
  frentes: Array<number>
}

export function CardScheduledSession({
  name,
  email,
  frentes
}: CardScheduledSessionProps) {
  return (
    <S.Wrapper>
      <UserInfo name={name} email={email} frentes={frentes} />
    </S.Wrapper>
  )
}

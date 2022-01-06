import * as S from './styles'
import { UserInfo } from '../UserInfo/index'

export type CardVoluntarioProps = {
  name: string
  email?: string
  profileLink?: string
  frentes: Array<Number>
  title: string
  description: string
}

export function CardVoluntario({
  name,
  email,
  profileLink,
  frentes,
  title,
  description
}: CardVoluntarioProps) {
  return (
    <S.Wrapper data-testid="card-voluntario">
      <UserInfo
        name={name}
        email={email}
        profileLink={profileLink}
        frentes={frentes}
      />
      <div className="title">{title}</div>
      <div className="description">{description}</div>
    </S.Wrapper>
  )
}

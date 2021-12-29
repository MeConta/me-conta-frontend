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
    <S.Wrapper>
      <UserInfo
        name={name}
        email={email}
        profileLink={profileLink}
        frentes={frentes}
        width={400}
      />
      <div className="title">{title}</div>
      <div className="description">{description}</div>
    </S.Wrapper>
  )
}

import * as S from './styles'
import { Avatar } from '../../atoms/Avatar/index'
import Frentes from '../../atoms/Frentes/index'

import Link from 'next/link'

export type UserInfoProps = {
  name: string
  email?: string
  profileLink?: string
  frentes: Array<Number>
}

export function UserInfo({ name, email, profileLink, frentes }: UserInfoProps) {
  return (
    <S.Wrapper>
      <div className="avatarAndInfoContainer">
        <Avatar name={name} email={email} />
        <div className="info">
          <span className="name">{name}</span>
          {profileLink && (
            <Link href={profileLink}>
              <a className="profileLink">Ver perfil completo</a>
            </Link>
          )}
        </div>
      </div>
      {frentes && <Frentes frentes={frentes} />}
    </S.Wrapper>
  )
}

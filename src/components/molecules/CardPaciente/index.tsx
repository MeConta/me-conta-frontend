import * as S from './styles'
import { UserInfo } from '../UserInfo/index'
import { Whatsapp } from '@styled-icons/bootstrap/Whatsapp'

export type CardPacienteProps = {
  date: string
  name: string
  email?: string
  profileLink?: string
  frentes: Array<number>
  title: string
  description: string
  whatsappLink: string
}

export function CardPaciente({
  date,
  name,
  email,
  profileLink,
  frentes,
  title,
  description,
  whatsappLink
}: CardPacienteProps) {
  return (
    <S.Wrapper>
      <div className="dateAndCancelContainer">
        <span className="date">{date}</span>
        <button className="cancelButton">cancelar</button>
      </div>
      <div className="container">
        <UserInfo
          name={name}
          email={email}
          profileLink={profileLink}
          frentes={frentes}
        />
        <div className="title">{title}</div>
        <div className="description">{description}</div>
      </div>
      <button className="button">
        <Whatsapp className="whatsIcon" />
        <a
          href={whatsappLink}
          className="buttonLink"
          target="_blank"
          rel="noreferrer"
        >
          Entrar em contato via whatsapp
        </a>
      </button>
    </S.Wrapper>
  )
}

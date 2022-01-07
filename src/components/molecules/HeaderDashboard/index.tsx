import React from 'react'
import Logo from '../../../../public/assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import * as S from './styles'

type Links = { label: string; href: string }[]

const headerDashboardLinks = [
  { label: 'Agenda', href: '/agenda' },
  { label: 'Meus horários', href: '/meus-horarios' },
  { label: 'Meu perfil', href: '/meu-perfil' }
] as Links

export type HeaderDashboardProps = {
  logoSrc?: string | StaticImageData
  links?: Links
  userName: string
}

export default function HeaderDashboard({
  logoSrc = Logo,
  links = headerDashboardLinks,
  userName
}: HeaderDashboardProps) {
  return (
    <S.Wrapper>
      <div className="content">
        <div className="menu-container">
          <Image
            unoptimized={true}
            src={logoSrc}
            alt="Logo Me Conta"
            width={168}
            height={56}
          />

          <nav className="nav">
            <ul>
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a>{link.label}</a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="userinfo-container">
          <div className="greeting-container">
            {'Olá, '}
            <b>{userName}</b>
          </div>

          <button className="logout">Sair</button>
        </div>
      </div>
    </S.Wrapper>
  )
}

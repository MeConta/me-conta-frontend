import React, { useState } from 'react'
import Logo from '../../../../public/assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { FiMenu } from 'react-icons/fi'
import { GrClose } from 'react-icons/gr'

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
  const [menuToggle, setMenuToggle] = useState(false)

  return (
    <S.Wrapper>
      <div className="content">
        <Image
          unoptimized={true}
          src={logoSrc}
          alt="Logo Me Conta"
          width={168}
          height={56}
        />

        <FiMenu
          className="open-menu-button"
          onClick={() => setMenuToggle(true)}
        />

        <div className={`menu-container ${menuToggle ? 'open' : ''}`}>
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

          <div className="userinfo-container">
            <div className="greeting-container">
              {'Olá, '}
              <b>{userName}</b>
            </div>

            <button className="logout">Sair</button>
          </div>

          <GrClose
            className="close-menu-button"
            onClick={() => setMenuToggle(false)}
          />
        </div>
      </div>
    </S.Wrapper>
  )
}

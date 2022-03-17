import React, { useEffect, useState } from 'react'
import Logo from '../../../../public/assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { FiMenu } from 'react-icons/fi'
import { GrClose } from 'react-icons/gr'
import router from 'next/router'

import * as S from './styles'
import { useAuthService } from '../../../services/auth-services/auth-service'

type Links = { label: string; href: string }[]

const headerDashboardLinks = [
  { label: 'Agenda', href: '/agenda' },
  { label: 'Meus horários', href: '/meus-horarios' },
  { label: 'Meu perfil', href: '/meu-perfil' }
] as Links

export type HeaderDashboardProps = {
  logoSrc?: string | StaticImageData
  links?: Links
  userName?: string
}

export default function HeaderDashboard({
  logoSrc = Logo,
  links = headerDashboardLinks,
  userName
}: HeaderDashboardProps) {
  const [menuToggle, setMenuToggle] = useState(false)
  const authCtx = useAuthService()

  const logoutHandler = () => {
    authCtx.clearSessionData()
    router.push('/login')
  }

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
              <b>{userName || authCtx.session.nome}</b>
            </div>

            <button className="logout" onClick={logoutHandler}>
              Sair
            </button>
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

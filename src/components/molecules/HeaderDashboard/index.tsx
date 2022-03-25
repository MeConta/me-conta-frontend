import React, { useEffect, useState } from 'react'
import Logo from '../../../../public/assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { FiMenu } from 'react-icons/fi'
import { GrClose } from 'react-icons/gr'
import router from 'next/router'

import * as S from './styles'
import { useAuthService } from '../../../services/auth-services/auth-service'
import { headerDashboardLinks } from './headerDashboardLinks'

export type HeaderDashboardProps = {
  logoSrc?: string | StaticImageData
  userName?: string
}

export default function HeaderDashboard({
  logoSrc = Logo,
  userName
}: HeaderDashboardProps) {
  const [menuToggle, setMenuToggle] = useState(false)
  const authCtx = useAuthService()

  const logoutHandler = async () => {
    await authCtx.authService.logout()
    authCtx.handleLogout()
    router.push('/login')
  }

  const links = !!authCtx.session.tipo
    ? headerDashboardLinks[parseInt(authCtx.session.tipo)]
    : []

  const menuToggleClass: string = menuToggle ? 'open' : ''

  return (
    <S.Wrapper>
      <div className="content">
        <Link href="/" passHref>
          <Image
            unoptimized={true}
            src={logoSrc}
            alt="Logo Me Conta"
            width={168}
            height={56}
            className="logo-image"
          />
        </Link>
        <FiMenu
          className="open-menu-button"
          onClick={() => setMenuToggle(true)}
        />

        {authCtx.isLoggedIn ? (
          <div className={`menu-container ${menuToggleClass}`}>
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
                <b>{userName || authCtx?.session?.nome}</b>
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
        ) : (
          <div className={`menu-container ${menuToggleClass}`}>
            <div className="userinfo-container">
              <button
                className="login"
                onClick={() => {
                  router.push('/login')
                }}
              >
                Acessar
              </button>
            </div>
            <GrClose
              className="close-menu-button"
              onClick={() => setMenuToggle(false)}
            />
          </div>
        )}
      </div>
    </S.Wrapper>
  )
}

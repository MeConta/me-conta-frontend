import React, { useState } from 'react'
import Image from 'next/image'
import Logo from '../../../assets/logo.png'
import { Button } from '../../atoms/Button'

import { FiMenu } from 'react-icons/fi'
import * as S from './styles'
import { Sidebar } from '../../atoms/Sidebar'

type HeaderProps = {
  unoptimizedImage?: boolean
}

export function Header({ unoptimizedImage = false }: HeaderProps) {
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <>
      <Sidebar
        showSidebar={showSidebar}
        handleCloseButton={() => setShowSidebar(false)}
      />
      <S.Wrapper>
        <Image
          unoptimized={unoptimizedImage}
          src={Logo}
          alt="Logo Me Conta"
          width={402}
          height={141}
        />
        <S.OptionsContainer className="options-container">
          <a href="">Quem somos</a>
          <a href="">Serviços</a>
          <a href="">Equipes</a>
          <a href="">Contato</a>
          <Button color="primary">Acesse Já!</Button>
        </S.OptionsContainer>
        <FiMenu
          className="open-menu-button"
          onClick={() => setShowSidebar(true)}
        />
      </S.Wrapper>
    </>
  )
}

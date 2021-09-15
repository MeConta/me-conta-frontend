import React from 'react'
import Image from 'next/image'
import Logo from '../../../assets/logo.png'
import * as S from './styles'
import { Button } from 'components/atoms/Button'

export default function Header() {
  return (
    <S.Wrapper>
      <Image src={Logo} alt="Logo Me Conta" />
      <S.OptionsContainer>
        <a href="">Quem somos</a>
        <a href="">Serviços</a>
        <a href="">Equipes</a>
        <a href="">Contato</a>
        <Button color="primary">Acesse Já!</Button>
      </S.OptionsContainer>
    </S.Wrapper>
  )
}

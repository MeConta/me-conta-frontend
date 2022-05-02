import React from 'react'
import Logo from '../../../../public/assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import * as S from './styles'
import { ReactNode } from 'react'
import { UserType } from 'enums/user-type.enum'
import NavigationLocation from '../NavigationLocation/index'
import { PassosCadastro } from 'enums/passos-cadastro.enum'

type WrapperFormProps = {
  title?: ReactNode
  tipoDeUsuario?: UserType
  passoCadastro?: PassosCadastro
  children: ReactNode
}

export const WrapperForm = ({
  title,
  tipoDeUsuario,
  passoCadastro,
  children
}: WrapperFormProps) => {
  return (
    <S.Wrapper>
      <Link href="/">
        <a>
          <Image src={Logo} alt="Logo Me Conta" width={300} height={110} />
        </a>
      </Link>
      {title}
      {passoCadastro !== undefined && tipoDeUsuario !== undefined && (
        <NavigationLocation
          passo={passoCadastro}
          tipoDeUsuario={+tipoDeUsuario}
        ></NavigationLocation>
      )}
      {children}
    </S.Wrapper>
  )
}

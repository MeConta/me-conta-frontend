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
  borderPresent?: boolean
  padding?: string
  logoSrc?: string | StaticImageData
  tipoDeUsuario?: UserType
  passoCadastro?: PassosCadastro
  children: ReactNode
}

export const WrapperForm = ({
  title,
  borderPresent,
  padding,
  logoSrc = Logo,
  tipoDeUsuario,
  passoCadastro,
  children
}: WrapperFormProps) => {
  return (
    <S.Wrapper borderPresent={borderPresent} padding={padding}>
      <Link href="/">
        <a>
          <Image src={logoSrc} alt="Logo Me Conta" width={300} height={110} />
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

import React, { AriaRole } from 'react'
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
  logoSize?: 'small' | 'medium'
  shape?: 'square'
  tipoDeUsuario?: UserType
  passoCadastro?: PassosCadastro
  children: ReactNode
  role?: AriaRole
  actionItems?: Array<ReactNode | HTMLElement>
  id?: string
}

export const WrapperForm = ({
  title,
  borderPresent,
  padding,
  logoSrc = Logo,
  logoSize = 'medium',
  shape,
  tipoDeUsuario,
  passoCadastro,
  children,
  role,
  id,
  actionItems,
  ...props
}: WrapperFormProps) => {
  const logoSizes = {
    small: {
      width: 200,
      height: 70
    },
    medium: {
      width: 300,
      height: 110
    }
  }

  return (
    <S.Wrapper
      borderPresent={borderPresent}
      padding={padding}
      shape={shape}
      id={id}
      role={role}
      {...props}
    >
      {actionItems && (
        <S.ActionItemsWrapper id="action-items-wrapper">
          {actionItems}
        </S.ActionItemsWrapper>
      )}
      <Link href="/">
        <a>
          <Image
            src={logoSrc}
            alt="Logo Me Conta"
            width={logoSizes[logoSize].width}
            height={logoSizes[logoSize].height}
          />
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

import React, { ReactPropTypes } from 'react'
import Logo from '../../../assets/logo.png'
import Image from 'next/image'
import Link from 'next/link'
import * as S from './styles'
import { ReactNode } from 'react'

type WrapperFormProps = {
  children: ReactNode
}

export const WrapperForm = ({ children }: WrapperFormProps) => {
  return (
    <S.Wrapper>
      <Link href="/">
        <a>
          <Image src={Logo} alt="Logo Me Conta" width={300} height={110} />
        </a>
      </Link>
      {children}
    </S.Wrapper>
  )
}

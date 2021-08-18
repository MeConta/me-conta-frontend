import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import * as S from './styles'

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>

export type Props = {
  children: React.ReactNode
  size?: 'medium' | 'large'
  color?: 'primary' | 'secondary'
  as?: React.ElementType
} & ButtonTypes

export function Button({
  children,
  size = 'large',
  color = 'primary',
  ...props
}: Props) {
  return (
    <S.Button size={size} color={color} {...props}>
      {children}
    </S.Button>
  )
}

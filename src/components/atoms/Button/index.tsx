import React, { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'
import * as S from './styles'

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>

export type Props = {
  children: React.ReactNode
  size?: 'medium' | 'large'
  color?: 'primary' | 'secondary' | 'negative'
  radius?: 'round' | 'square'
  as?: React.ElementType
} & ButtonTypes

export function Button({
  children,
  size = 'large',
  color = 'primary',
  radius = 'round',
  ...props
}: Props) {
  return (
    <S.Button size={size} color={color} radius={radius} {...props}>
      {children}
    </S.Button>
  )
}

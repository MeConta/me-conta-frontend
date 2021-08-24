import { AnchorHTMLAttributes, ButtonHTMLAttributes } from 'react'

import * as S from './styles'

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonProps = {
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
}: ButtonProps) {
  return (
    <S.Wrapper size={size} color={color} radius={radius} {...props}>
      {children}
    </S.Wrapper>
  )
}

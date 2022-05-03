import { AnchorHTMLAttributes, ButtonHTMLAttributes, ElementType } from 'react'

import * as S from './styles'

type ButtonTypes =
  | AnchorHTMLAttributes<HTMLAnchorElement>
  | ButtonHTMLAttributes<HTMLButtonElement>

export type ButtonProps = {
  children: React.ReactNode
  size?: 'medium' | 'mediumLarge' | 'large'
  color?: 'primary' | 'secondary' | 'negative'
  radius?: 'round' | 'square'
  textTransform?: 'uppercase'
  btnStyle?: 'link'
  prefixIcon?: React.ReactNode
  as?: ElementType
} & ButtonTypes

export function Button({
  children,
  size = 'large',
  color = 'primary',
  radius = 'round',
  textTransform,
  btnStyle,
  prefixIcon,
  ...props
}: ButtonProps) {
  return (
    <S.Wrapper
      size={size}
      color={color}
      radius={radius}
      textTransform={textTransform}
      btnStyle={btnStyle}
      prefixIcon={prefixIcon}
      {...props}
    >
      {prefixIcon}
      {children}
    </S.Wrapper>
  )
}

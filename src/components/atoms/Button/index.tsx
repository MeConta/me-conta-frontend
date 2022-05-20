import { AnchorHTMLAttributes, ButtonHTMLAttributes, ElementType } from 'react'
import useDelayUnmount from 'utils/animations/unmountHelper'
import Loader from '../Loader'

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
  isLoading?: boolean
  disabled?: boolean
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
  isLoading,
  disabled,
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
      isLoading={isLoading}
      disabled={disabled || isLoading}
      {...props}
    >
      {prefixIcon}
      {children}
      {useDelayUnmount(isLoading) && <Loader size="30px" borderSize="5px" />}
    </S.Wrapper>
  )
}

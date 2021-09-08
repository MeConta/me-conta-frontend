import { ReactNode } from 'react'
import * as S from './styles'

export type CardContainerProps = {
  boxShadowType?: 'inset' | 'default'
  children: ReactNode
}

export function CardContainer({
  children,
  boxShadowType = 'default'
}: CardContainerProps) {
  return <S.Wrapper boxShadowType={boxShadowType}>{children}</S.Wrapper>
}

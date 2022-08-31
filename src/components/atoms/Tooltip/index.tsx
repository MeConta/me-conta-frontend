import { ReactNode } from 'react'
import { TooltipWrapper, Wrapper } from './styles'

type TooltipProps = {
  text: string
  children: ReactNode
}

export function Tooltip({ text, children }: TooltipProps) {
  return (
    <Wrapper>
      {children}
      <TooltipWrapper>{text}</TooltipWrapper>
    </Wrapper>
  )
}

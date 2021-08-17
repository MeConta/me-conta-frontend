import * as S from './styles'

export type Props = {
  children: React.ReactNode
  size?: 'medium' | 'large'
  color?: 'primary' | 'secondary'
}

export function Button({ children, size = 'large', color = 'primary' }: Props) {
  return (
    <S.Button size={size} color={color}>
      {children}
    </S.Button>
  )
}

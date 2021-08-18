import * as S from './styles'

export type Props = {
  children: React.ReactNode
  size?: 'medium' | 'large'
  color?: 'primary' | 'secondary' | 'negative'
  radius?: 'round' | 'square'
}

export function Button({ children, size = 'large', color = 'primary', radius = 'round' }: Props) {
  return (
    <S.Button size={size} color={color} radius={radius}>
      {children}
    </S.Button>
  )
}

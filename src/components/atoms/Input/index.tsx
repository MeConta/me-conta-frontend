import * as S from './styles'

export type Props = {
  type?: 'text' | 'email' | 'password' | 'number'
//  id?
//  placeholder?
// value?
// required?
// onChange?
// aria-label?

//   children: React.ReactNode
//   size?: 'medium' | 'large'
//   color?: 'primary' | 'secondary' | 'negative'
//   radius?: 'round' | 'square'
}

export function Input({ type='text' }: Props) {
  return (
    <S.Input type={type} />
  )
}

import * as S from './styles'

interface Props {
  children: React.ReactNode
}

export default function Button({ children }: Props) {
  return <S.Button>{children}</S.Button>
}

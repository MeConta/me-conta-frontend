import * as S from './styles'

export interface LoaderProps {
  size?: string
  borderSize?: string
}

export default function Loader(props: LoaderProps) {
  return (
    <S.Container id="loader" data-testid="loader-container">
      <S.Loader
        size={props.size}
        borderSize={props.borderSize}
        data-testid="loader"
      />
    </S.Container>
  )
}

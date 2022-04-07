import * as S from './styles'

export function Loader() {
  return (
    <S.Container data-testid="loader-container">
      <S.Loader data-testid="loader" />
    </S.Container>
  )
}

export default Loader

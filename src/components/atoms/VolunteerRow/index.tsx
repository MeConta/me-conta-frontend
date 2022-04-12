import { Button } from '../Button'
import * as S from './styles'

function VolunteerRow() {
  return (
    <>
      <S.RowContainer data-testid="row-container">
        <td>Approvado</td>
        <td>Atendente</td>
        <td>Test name</td>
        <td>Não</td>
      </S.RowContainer>
      <Button>Ver Perfil</Button>
    </>
  )
}

export default VolunteerRow

import FrentesDropdown from 'components/molecules/FrentesDropdown'
import * as S from '../../styles/pages/dashboards/styles'
import * as Styled from './styles'

type SelectedFrente = {
  id: number
  text: string
  value: string
}

export default function DashboardAluno() {
  const onSelectItemHandler = (item: SelectedFrente) => {
    console.log(item)
  }

  return (
    <S.WrapperDashboard>
      <Styled.Title>
        Escolha uma especialidade e um especialista para sua sessão:
      </Styled.Title>
      <FrentesDropdown onSelectItem={onSelectItemHandler} />
    </S.WrapperDashboard>
  )
}

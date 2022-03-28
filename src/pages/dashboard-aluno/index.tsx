import FrentesDropdown from 'components/molecules/FrentesDropdown'
import * as S from '../../styles/pages/dashboards/styles'
import * as Styled from '../../styles/pages/dashboards/dashboard-aluno/styles'
import { authenticatedRoute } from 'utils/authentication/authenticationRoute'
import { UserType } from 'enums/user-type.enum'
import { api } from 'services/api/api'

type SelectedFrente = {
  id: number
  text: string
  value: string
}

function DashboardAluno() {
  const onSelectItemHandler = (item: SelectedFrente) => {
    console.log(item)
  }

  const testHandler = async () => {
    const res = await api.get('/atendimento')
    console.log(res)
  }

  return (
    <S.WrapperDashboard>
      <Styled.Title>
        Escolha uma especialidade e um especialista para sua sessão:
      </Styled.Title>
      <FrentesDropdown onSelectItem={onSelectItemHandler} />

      <button onClick={testHandler}></button>
    </S.WrapperDashboard>
  )
}

export default authenticatedRoute(DashboardAluno, {
  allowedRoles: [UserType.ALUNO]
})

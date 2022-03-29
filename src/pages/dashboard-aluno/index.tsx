import FrentesDropdown from 'components/molecules/FrentesDropdown'
import * as S from '../../styles/pages/dashboards/styles'
import * as Styled from '../../styles/pages/dashboards/dashboard-aluno/styles'
import { authenticatedRoute } from 'utils/authentication/authenticationRoute'
import { UserType } from 'enums/user-type.enum'
import { api } from 'services/api/api'
import { VolunteerService } from 'services/volunteers-services/volunteer-service'
import { useEffect, useState } from 'react'

type SelectedFrente = {
  id: number
  text: string
  value: string
}

function DashboardAluno() {
  const volunteerService = new VolunteerService(api)

  const onSelectItemHandler = async (item: SelectedFrente) => {
    const res = await volunteerService.findVolunteers({
      type: UserType.ATENDENTE,
      sessionType: item.id
    })
    console.log(res)
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

export default authenticatedRoute(DashboardAluno, {
  allowedRoles: [UserType.ALUNO]
})

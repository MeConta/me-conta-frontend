import { UserType } from 'enums/user-type.enum'
import { authenticatedRoute } from 'utils/authentication/authenticationRoute'
import * as S from '../../styles/pages/dashboards/styles'
import Filter from '../../components/molecules/Filter'
import {
  VolunteerResponse,
  VolunteerService
} from 'services/volunteers-service/volunteer-service'
import { api } from 'services/api/api'
import { StatusAprovacao } from 'enums/volunteer-status.enum'
import { useEffect, useState } from 'react'

const attendantStatus = ['Em aberto', 'Aprovados', 'Reprovados', 'Todos']

function DashboardAdministrador() {
  const [volunteers, setVolunteers] = useState<VolunteerResponse[]>([])

  const volunteerService = new VolunteerService(api)

  const fetchVolunteers = async (volunteerStatus: StatusAprovacao) => {
    const fetchedVolunteers = await volunteerService.findByApprovalStatus(
      volunteerStatus
    )
    setVolunteers(fetchedVolunteers)
  }

  const onSelectedFilter = async (filterName: string) => {
    await fetchVolunteers(StatusAprovacao.ABERTO)
  }

  useEffect(() => {
    fetchVolunteers(StatusAprovacao.ABERTO)
  }, [])

  return (
    <S.WrapperDashboard>
      <S.Title> Lista de Voluntários </S.Title>
      <Filter filterOptions={attendantStatus} handleClick={onSelectedFilter} />
    </S.WrapperDashboard>
  )
}

export default authenticatedRoute(DashboardAdministrador, {
  allowedRoles: [UserType.ADMINISTRADOR]
})

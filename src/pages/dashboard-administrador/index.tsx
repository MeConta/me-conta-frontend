import { UserType } from 'enums/user-type.enum'
import { authenticatedRoute } from 'utils/authentication/authenticationRoute'
import * as S from '../../styles/pages/dashboards/styles'
import * as STable from '../../styles/pages/dashboards/dashboard-administrador/styles'
import Filter from '../../components/molecules/Filter'
import {
  VolunteerResponse,
  VolunteerService
} from 'services/volunteers-service/volunteer-service'
import { api } from 'services/api/api'
import { StatusAprovacao } from 'enums/volunteer-status.enum'
import { useEffect, useState } from 'react'
import Tag from 'components/atoms/Tag'
import theme from '../../styles/theme'

type VolunteerStatus = 'Em aberto' | 'Aprovados' | 'Reprovados' | 'Todos'
const volunteerStatus = ['Em aberto', 'Aprovados', 'Reprovados', 'Todos']

function DashboardAdministrador() {
  const [volunteers, setVolunteers] = useState<VolunteerResponse[]>([])

  const volunteerService = new VolunteerService(api)

  const fetchVolunteers = async (approvalStatus?: StatusAprovacao) => {
    const fetchedVolunteers = await volunteerService.findByApprovalStatus(
      approvalStatus
    )
    setVolunteers(fetchedVolunteers)
  }

  const onSelectedFilter = async (filterName: VolunteerStatus) => {
    const statusByFilterName = {
      'Em aberto': StatusAprovacao.ABERTO,
      Aprovados: StatusAprovacao.APROVADO,
      Reprovados: StatusAprovacao.REPROVADO,
      Todos: undefined
    }

    await fetchVolunteers(statusByFilterName[filterName])
  }

  useEffect(() => {
    fetchVolunteers(StatusAprovacao.ABERTO)
  }, [])

  const getTagAttributes = (status: boolean) => {
    switch (status) {
      case null:
        return {
          title: 'Aberto',
          titleColor: theme.colors.harvestGold,
          backgroundColor: theme.colors.blondYellow
        }
      case true:
        return {
          title: 'Aprovado',
          titleColor: theme.colors.emerald,
          backgroundColor: theme.colors.honeydew
        }
      case false:
        return {
          title: 'Reprovado',
          titleColor: theme.colors.maroonFlush,
          backgroundColor: theme.colors.mistyRose
        }
    }
  }

  return (
    <S.WrapperDashboard>
      <S.Title> Lista de Voluntários </S.Title>
      <Filter filterOptions={volunteerStatus} handleClick={onSelectedFilter} />
      <STable.TableContainer>
        <tr>
          <th>Status</th>
          <th>Nome</th>
          <th>Tipo</th>
          <th></th>
        </tr>
        {volunteers.map((volunteer) => (
          <tr key={volunteer.usuario.id}>
            <td>
              <Tag
                title={getTagAttributes(volunteer.aprovado).title}
                titleColor={getTagAttributes(volunteer.aprovado).titleColor}
                backgroundColor={
                  getTagAttributes(volunteer.aprovado).backgroundColor
                }
              ></Tag>
            </td>
            <td>{volunteer.usuario.nome}</td>
            <td>{volunteer.frentes}</td>
            <td>
              <button>ver perfil</button>
            </td>
          </tr>
        ))}
      </STable.TableContainer>
    </S.WrapperDashboard>
  )
}

export default authenticatedRoute(DashboardAdministrador, {
  allowedRoles: [UserType.ADMINISTRADOR]
})

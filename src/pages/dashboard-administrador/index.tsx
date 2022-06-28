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
import router from 'next/router'
import { Button } from 'components/atoms/Button'

enum VolunteerStatus {
  EM_ABERTO = 'Em aberto',
  APROVADOS = 'Aprovados',
  REPROVADOS = 'Reprovados',
  TODOS = 'Todos'
}

const volunteerStatus = [
  VolunteerStatus.EM_ABERTO,
  VolunteerStatus.APROVADOS,
  VolunteerStatus.REPROVADOS,
  VolunteerStatus.TODOS
]

function DashboardAdministrador() {
  const [volunteers, setVolunteers] = useState<VolunteerResponse[]>([])
  const [statusLabel, setStatusLabel] = useState<string>('em aberto')

  const volunteerService = new VolunteerService(api)

  const fetchVolunteers = async (approvalStatus?: StatusAprovacao) => {
    try {
      const fetchedVolunteers = await volunteerService.findByApprovalStatus(
        approvalStatus
      )
      setVolunteers(fetchedVolunteers)
    } catch (error) {
      console.log(error)
    }
  }

  const updateStatusLabel = (status: VolunteerStatus) => {
    const statusLabels = {
      [VolunteerStatus.EM_ABERTO]: 'em aberto',
      [VolunteerStatus.APROVADOS]: 'aprovado',
      [VolunteerStatus.REPROVADOS]: 'reprovado',
      [VolunteerStatus.TODOS]: 'cadastrado'
    }

    setStatusLabel(statusLabels[status])
  }

  const onSelectedFilter = async (filterName: VolunteerStatus) => {
    const statusByFilterName = {
      [VolunteerStatus.EM_ABERTO]: StatusAprovacao.ABERTO,
      [VolunteerStatus.APROVADOS]: StatusAprovacao.APROVADO,
      [VolunteerStatus.REPROVADOS]: StatusAprovacao.REPROVADO,
      [VolunteerStatus.TODOS]: undefined
    }

    await fetchVolunteers(statusByFilterName[filterName])
    updateStatusLabel(filterName)
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

  const redirectToVolunteerProfile = (id: number) => {
    router.push(`/dashboard-administrador/perfil-voluntario/${id}`)
  }

  return (
    <S.WrapperDashboard>
      <S.Title> Lista de Voluntários </S.Title>
      <Filter filterOptions={volunteerStatus} handleClick={onSelectedFilter} />
      {volunteers?.length > 0 && (
        <STable.TableContainer>
          <thead>
            <tr>
              <th>Status</th>
              <th>Nome</th>
              <th>Tipo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {volunteers?.map((volunteer) => {
              const tagAttributes = getTagAttributes(volunteer?.aprovado)

              return (
                <tr key={volunteer.usuario.id}>
                  <td>
                    <Tag
                      title={tagAttributes?.title}
                      titleColor={tagAttributes?.titleColor}
                      backgroundColor={tagAttributes?.backgroundColor}
                    ></Tag>
                  </td>
                  <td>{volunteer.usuario.nome}</td>
                  <td>{volunteer.frentes}</td>
                  <td>
                    <Button
                      color="secondary"
                      size="small"
                      radius="square"
                      onClick={() =>
                        redirectToVolunteerProfile(volunteer.usuario.id)
                      }
                    >
                      Ver Perfil
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </STable.TableContainer>
      )}

      {!volunteers.length && (
        <S.SectionContainer>
          <S.MessageContainer>
            <S.HourglassIcon />
            <p>Nenhum voluntário {statusLabel} no momento.</p>
          </S.MessageContainer>
        </S.SectionContainer>
      )}
    </S.WrapperDashboard>
  )
}

export default authenticatedRoute(DashboardAdministrador, {
  allowedRoles: [UserType.ADMINISTRADOR]
})

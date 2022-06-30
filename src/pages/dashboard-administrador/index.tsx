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
import Loader from 'components/atoms/Loader'
import Acolhimento from '../../../public/assets/volunteer/services/acolhimentoIcon.png'
import CoachingEstudos from '../../../public/assets/volunteer/services/coachingEstudosIcon.png'
import OrientacaoVocacional from '../../../public/assets/volunteer/services/orientacaoVocacionalIcon.png'
import ImageIcon from 'components/atoms/ImageIcon'

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
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const volunteerService = new VolunteerService(api)

  const fetchVolunteers = async (approvalStatus?: StatusAprovacao) => {
    setIsLoading(true)

    try {
      const fetchedVolunteers = await volunteerService.findByApprovalStatus(
        approvalStatus
      )
      setVolunteers(fetchedVolunteers)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
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

  const getIconsAttributes = (service: number) => {
    switch (service) {
      case 0:
        return {
          imageSrc: Acolhimento.src,
          imageAlt: 'acolhimento',
          backgroundColor: '#F8F5FF',
          tooltip: 'Acolhimento'
        }
      case 1:
        return {
          imageSrc: CoachingEstudos.src,
          imageAlt: 'Coaching de Estudos',
          backgroundColor: '#E8FFF3',
          tooltip: 'Coaching de Estudos'
        }
      default:
        return {
          imageSrc: OrientacaoVocacional.src,
          imageAlt: 'Orientação Vocacional',
          backgroundColor: '#F1FAFF',
          tooltip: 'Orientação Vocacional'
        }
    }
  }

  const redirectToVolunteerProfile = (id: number) => {
    router.push(`/dashboard-administrador/perfil-voluntario/${id}`)
  }

  const renderVolunteerServices = (services: number[]) => {
    return services?.map((service) => {
      const value = getIconsAttributes(service)
      return (
        <ImageIcon
          key={service}
          backgroundColor={value.backgroundColor}
          imageAlt={value.imageAlt}
          imageSrc={value.imageSrc}
          tooltip={value.tooltip}
          imageHeight={24}
          imageWidth={24.63}
        />
      )
    })
  }

  return (
    <S.WrapperDashboard>
      <S.Title> Lista de Voluntários </S.Title>
      <Filter filterOptions={volunteerStatus} handleClick={onSelectedFilter} />

      {isLoading && (
        <S.SectionContainer>
          <Loader />
        </S.SectionContainer>
      )}

      {volunteers?.length > 0 && !isLoading && (
        <STable.WrapperTable>
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
              {volunteers.map((volunteer) => (
                <tr key={volunteer.usuario.id}>
                  <td>
                    <Tag
                      title={getTagAttributes(volunteer.aprovado).title}
                      titleColor={
                        getTagAttributes(volunteer.aprovado).titleColor
                      }
                      backgroundColor={
                        getTagAttributes(volunteer.aprovado).backgroundColor
                      }
                    ></Tag>
                  </td>
                  <td>{volunteer.usuario.nome}</td>
                  <td>
                    <STable.CellContainer>
                      {renderVolunteerServices(volunteer.frentes)}
                    </STable.CellContainer>
                  </td>
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
              ))}
            </tbody>
          </STable.TableContainer>
        </STable.WrapperTable>
      )}

      {!volunteers.length && !isLoading && (
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

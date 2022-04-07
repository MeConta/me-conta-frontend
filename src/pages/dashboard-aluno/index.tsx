import FrentesDropdown from 'components/molecules/FrentesDropdown'
import * as S from '../../styles/pages/dashboards/styles'
import * as Styled from '../../styles/pages/dashboards/dashboard-aluno/styles'
import { authenticatedRoute } from 'utils/authentication/authenticationRoute'
import { UserType } from 'enums/user-type.enum'
import { CardVoluntario } from 'components/molecules/CardVoluntario'
import {
  VolunteerResponse,
  VolunteerService
} from 'services/volunteers-service/volunteer-service'
import { api } from 'services/api/api'
import { useState, useEffect } from 'react'

type SelectedFrente = {
  id: number
  text: string
  value: string
}

function DashboardAluno() {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [volunteers, setVolunteers] = useState<VolunteerResponse[]>([])

  const volunteerService = new VolunteerService(api)

  const fetchVolunteers = async ({ sessionType }: { sessionType?: number }) => {
    setIsLoading(true)
    const fetchedVolunteers = await volunteerService.findBySessionType({
      sessionType
    })
    setVolunteers(fetchedVolunteers)
    setIsLoading(false)
  }

  const onSelectItemHandler = async (item: SelectedFrente) => {
    await fetchVolunteers({ sessionType: item.id })
  }

  useEffect(() => {
    fetchVolunteers({})
  }, [])

  return (
    <S.WrapperDashboard>
      <Styled.SectionContainer>
        <Styled.Title>
          Escolha uma especialidade e um especialista para sua sessão:
        </Styled.Title>
        <FrentesDropdown onSelectItem={onSelectItemHandler} />
      </Styled.SectionContainer>

      <Styled.SectionContainer>
        <Styled.Title>
          Selecione o profissional perfeito para você:
        </Styled.Title>

        {!isLoading && (
          <Styled.VolunteersCard>
            {volunteers.length > 0 && (
              <Styled.VolunteersGrid>
                {volunteers.map((volunteer) => {
                  return (
                    <div key={volunteer.usuario.id}>
                      <CardVoluntario
                        description={volunteer.abordagem}
                        frentes={volunteer.frentes}
                        name={volunteer.usuario.nome}
                        title={volunteer.areaAtuacao}
                      />
                    </div>
                  )
                })}
              </Styled.VolunteersGrid>
            )}

            {!volunteers.length && (
              <Styled.MessageContainer>
                <Styled.HourglassIcon />
                <p>
                  Desculpe, não possuímos profissionais capacitados para atuar
                  nessa frente no momento. Por favor, tente novamente mais
                  tarde.
                </p>
              </Styled.MessageContainer>
            )}
          </Styled.VolunteersCard>
        )}
      </Styled.SectionContainer>
    </S.WrapperDashboard>
  )
}

export default authenticatedRoute(DashboardAluno, {
  allowedRoles: [UserType.ALUNO]
})
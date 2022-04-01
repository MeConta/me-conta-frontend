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
import { useState } from 'react'

type SelectedFrente = {
  id: number
  text: string
  value: string
}

function DashboardAluno() {
  const [volunteers, setVolunteers] = useState<VolunteerResponse[]>([])

  const volunteerService = new VolunteerService(api)

  const onSelectItemHandler = async (item: SelectedFrente) => {
    const fetchedVolunteers = await volunteerService.findBySessionType({
      sessionType: item.id
    })
    setVolunteers(fetchedVolunteers)
  }

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

        <Styled.VolunteersCard>
          {volunteers.map((volunteer) => {
            return (
              <div key={volunteer.usuario.id}>
                <CardVoluntario
                  description={volunteer.abordagem}
                  frentes={volunteer.frentes}
                  name={volunteer.usuario.nome}
                  title={volunteer.areaAtuacao}
                ></CardVoluntario>
              </div>
            )
          })}

          {!volunteers.length && (
            <Styled.MessageContainer>
              <p>
                Desculpe, não possuímos profissionais capacitados para atuar
                nessa frente no momento. Por favor, tente novamente mais tarde.
              </p>
            </Styled.MessageContainer>
          )}
        </Styled.VolunteersCard>
      </Styled.SectionContainer>
    </S.WrapperDashboard>
  )
}

export default authenticatedRoute(DashboardAluno, {
  allowedRoles: [UserType.ALUNO]
})

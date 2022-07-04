import { UserType } from 'enums/user-type.enum'
import { authenticatedRoute } from '../../../utils/authentication/authenticationRoute'
import * as S from '../../../styles/pages/dashboards/styles'
import {
  TitleContainer,
  ContentWrapper,
  SectionDetailsContainer,
  SectionDetails,
  ButtonContainer
} from '../../../styles/pages/dashboards/dashboard-administrador/perfil-voluntario/styles'
import { Button } from 'components/atoms/Button'
import router from 'next/router'
import { ArrowLeft, CheckLg, XCircle } from 'styled-icons/bootstrap'
import { api } from 'services/api/api'
import { useEffect, useState } from 'react'
import {
  VolunteerResponse,
  VolunteerService,
  GenderTypes,
  Gender
} from 'services/volunteers-service/volunteer-service'

function PerfilVoluntario() {
  const [volunteer, setVolunteer] = useState<VolunteerResponse | null>(null)

  const volunteerService = new VolunteerService(api)

  const goBack = function () {
    router.push('/dashboard-administrador')
  }

  const fetchVolunteer = async (id: number) => {
    try {
      const fetchedVolunteer = await volunteerService.findById(id)
      setVolunteer(fetchedVolunteer)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchVolunteer(Number(router.query.id))
  }, [])

  function getGender(type?: GenderTypes) {
    return type ? Gender[type] : ''
  }

  return (
    <ContentWrapper>
      <TitleContainer>
        <S.Title> Perfil - Voluntário </S.Title>
        <Button onClick={goBack} btnStyle="link" prefixIcon={<ArrowLeft />}>
          Voltar ao Dashboard
        </Button>
      </TitleContainer>
      <S.ContainerDashboard>
        <S.SecondLevelTitle> Dados Pessoais: </S.SecondLevelTitle>
        <SectionDetailsContainer>
          <SectionDetails width="50%">
            <S.SectionDetailsText>
              <S.SectionDetailsTextHighlight>
                Nome:{' '}
              </S.SectionDetailsTextHighlight>
              {volunteer?.usuario.nome}{' '}
            </S.SectionDetailsText>
            <S.SectionDetailsText>
              <S.SectionDetailsTextHighlight>
                Gênero:{' '}
              </S.SectionDetailsTextHighlight>
              {getGender(volunteer?.genero)}{' '}
            </S.SectionDetailsText>
            <S.SectionDetailsText>
              <S.SectionDetailsTextHighlight>
                Cidade:{' '}
              </S.SectionDetailsTextHighlight>
              {volunteer?.cidade}{' '}
            </S.SectionDetailsText>
          </SectionDetails>
          <SectionDetails width="50%">
            <S.SectionDetailsText>
              <S.SectionDetailsTextHighlight>
                E-mail:{' '}
              </S.SectionDetailsTextHighlight>
              {volunteer?.usuario.email}{' '}
            </S.SectionDetailsText>
            <S.SectionDetailsText>
              <S.SectionDetailsTextHighlight>
                Telefone:{' '}
              </S.SectionDetailsTextHighlight>
              {volunteer?.telefone}{' '}
            </S.SectionDetailsText>
            <S.SectionDetailsText>
              <S.SectionDetailsTextHighlight>
                Estado:{' '}
              </S.SectionDetailsTextHighlight>
              {volunteer?.UF}{' '}
            </S.SectionDetailsText>
          </SectionDetails>
        </SectionDetailsContainer>
        <ButtonContainer>
          <Button
            color="success"
            radius="square"
            size="xMedium"
            sufixIcon={<CheckLg />}
          >
            APROVAR
          </Button>
          <Button
            color="secondary"
            radius="square"
            size="xMedium"
            sufixIcon={<XCircle />}
          >
            REPROVAR
          </Button>
        </ButtonContainer>
      </S.ContainerDashboard>
    </ContentWrapper>
  )
}

export default authenticatedRoute(PerfilVoluntario, {
  allowedRoles: [UserType.ADMINISTRADOR]
})

import { UserType } from 'enums/user-type.enum'
import { authenticatedRoute } from '../../../utils/authentication/authenticationRoute'
import * as S from '../../../styles/pages/dashboards/styles'
import {
  TitleContainer,
  ContentWrapper,
  SectionDetailsContainer,
  SectionDetails,
  ButtonContainer,
  LinkIcon,
  SectionLinkContainer,
  FieldLinkWrapper,
  SaveLinkWrapper
} from '../../../styles/pages/dashboards/dashboard-administrador/perfil-voluntario/styles'
import { Button } from 'components/atoms/Button'
import router from 'next/router'
import { ArrowLeft, CheckLg, XCircle } from 'styled-icons/bootstrap'
import { api } from 'services/api/api'
import { useEffect, useState } from 'react'
import { VolunteerService } from 'services/volunteers-service/volunteer-service'
import { Volunteer } from 'domain/volunteer'
import { NivelFormacao } from 'domain/nivel-formacao'
import { GenderTypes, Gender } from 'enums/gender.enum'
import Frentes from 'components/atoms/Frentes'
import { formatPhoneNumber } from '../../../utils/format-string/helpers'
import { EBrazilStates } from 'utils/enums/brazil-states.enum'
import SectionDetailsText from 'components/atoms/SectionDetailsText'
import { TextField } from 'components/atoms/TextField'
import { ToastType, useToast } from 'services/toast-service/toast-service'
import Loader from 'components/atoms/Loader'
import SaveIcon from 'components/atoms/SaveIcon'
import { formatErrorMessage } from '../../../utils/handlers/errorHandler'

const ERRORS = {
  REQUIRED_FIELD: 'Campo obrigatório'
}

function PerfilVoluntario() {
  const [volunteer, setVolunteer] = useState<Volunteer | null>(null)
  const [linkError, setLinkError] = useState<string>('')
  const [sessionLink, setSessionLink] = useState<string>('')
  const [disableButtonLink, setDisableButtonLink] = useState<boolean>(true)
  const [isLoading, setLoading] = useState<boolean>(true)
  const { emit } = useToast()
  const volunteerService = new VolunteerService(api)

  const goBack = async function () {
    await router.push('/dashboard-administrador')
  }

  const fetchVolunteer = async (id: number) => {
    setLoading(true)
    try {
      const fetchedVolunteer = await volunteerService.findById(id)
      setVolunteer(new Volunteer(fetchedVolunteer))
      setSessionLink(fetchedVolunteer.link)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVolunteer(Number(router.query.id))
  }, [])

  function getGender(type?: GenderTypes) {
    return type ? Gender[type] : ''
  }

  function getNivelFormacao(formado?: boolean) {
    if (typeof formado === 'undefined') return ''

    return formado
      ? NivelFormacao.SUPERIOR_COMPLETO.label
      : NivelFormacao.SUPERIOR_EM_ANDAMENTO.label
  }

  function showLinkError(sessionLink: string) {
    setLinkError(sessionLink ? '' : ERRORS.REQUIRED_FIELD)
  }

  function showSuccessFeedback(messageInput: string) {
    goBack()

    emit({
      type: ToastType.SUCCESS,
      message: messageInput
    })
  }

  const successMessageUpdate = 'Alteração feita com sucesso'

  function handleApproval() {
    if (volunteer && sessionLink) {
      volunteerService
        .approve(volunteer?.usuario.id, sessionLink)
        .then(() => {
          showSuccessFeedback(successMessageUpdate)
        })
        .catch((error) => {
          setLinkError(formatErrorMessage(error?.response?.data?.message[0]))
        })
    } else {
      showLinkError(sessionLink)
    }
  }

  function handleReject() {
    if (volunteer) {
      volunteerService
        .reject(volunteer?.usuario.id)
        .then(() => {
          showSuccessFeedback(successMessageUpdate)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  function handleSaveLink() {
    if (volunteer && sessionLink) {
      volunteerService
        .updateSessionLink(volunteer?.usuario.id, sessionLink)
        .then(() => {
          emit({
            type: ToastType.SUCCESS,
            message: 'Link das Sessões salvo com sucesso'
          })
        })
        .catch((error) => {
          console.error(error)
        })
    }
    showLinkError(sessionLink)
  }

  function renderVolunteersPersonalData() {
    return (
      <>
        <S.SecondLevelTitle> Dados Pessoais: </S.SecondLevelTitle>
        <SectionDetailsContainer>
          <SectionDetails width="50%">
            <SectionDetailsText
              label={'Nome'}
              value={volunteer?.usuario.nome || ''}
            />
            <SectionDetailsText
              label={'Gênero'}
              value={getGender(volunteer?.genero)}
            />
            <SectionDetailsText
              label={'Cidade'}
              value={volunteer?.cidade || ''}
            />
          </SectionDetails>
          <SectionDetails width="50%">
            <SectionDetailsText
              label={'E-mail'}
              value={volunteer?.usuario.email || ''}
            />
            <SectionDetailsText
              label={'Telefone'}
              value={formatPhoneNumber(volunteer?.telefone || '')}
            />
            <SectionDetailsText
              label={'Estado'}
              value={volunteer ? EBrazilStates[volunteer.UF] : ''}
            />
          </SectionDetails>
        </SectionDetailsContainer>
      </>
    )
  }

  function renderVolunteersAcademicData() {
    return (
      <>
        <S.SecondLevelTitle> Dados Acadêmicos: </S.SecondLevelTitle>
        <SectionDetailsContainer>
          <SectionDetails width="50%">
            <SectionDetailsText
              label={'Nível de Formação'}
              value={getNivelFormacao(volunteer?.formado)}
            />
            <SectionDetailsText
              label={'Instituição de Ensino'}
              value={volunteer?.instituicao || ''}
            />

            {volunteer?.formado ? (
              <SectionDetailsText
                label={'Ano de conclusão'}
                value={volunteer?.anoFormacao || ''}
              />
            ) : (
              <SectionDetailsText
                label={'Semestre'}
                value={volunteer?.semestre || ''}
              />
            )}
          </SectionDetails>
          <SectionDetails width="50%" alignItens="right">
            <SectionDetailsText
              label={'Áreas que gostaria de atuar'}
              value={''}
            />
            <Frentes frentes={volunteer?.frentes || []} />
          </SectionDetails>
        </SectionDetailsContainer>
        <SectionDetailsText
          label={'Breve descrição sobre você'}
          value={volunteer?.bio || ''}
        />
      </>
    )
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
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <SectionLinkContainer>
              <FieldLinkWrapper>
                <TextField
                  label="Link das Sessões"
                  name={'sessionLink'}
                  value={sessionLink}
                  onChange={(e) => {
                    setSessionLink(e.target.value)
                    setDisableButtonLink(false)
                  }}
                  required={true}
                  error={linkError}
                >
                  <LinkIcon />
                </TextField>
              </FieldLinkWrapper>
              {volunteer?.aprovado && (
                <SaveLinkWrapper>
                  <Button
                    color="primary"
                    radius="square"
                    size="xMedium"
                    prefixIcon={<SaveIcon />}
                    onClick={() => {
                      handleSaveLink()
                      setDisableButtonLink(true)
                    }}
                    disabled={disableButtonLink}
                  >
                    SALVAR LINK
                  </Button>
                </SaveLinkWrapper>
              )}
            </SectionLinkContainer>
            {renderVolunteersPersonalData()}
            {renderVolunteersAcademicData()}
            {volunteer?.isEmAberto() && (
              <ButtonContainer>
                <Button
                  color="success"
                  radius="square"
                  size="xMedium"
                  sufixIcon={<CheckLg />}
                  onClick={handleApproval}
                >
                  APROVAR
                </Button>
                <Button
                  color="secondary"
                  radius="square"
                  size="xMedium"
                  sufixIcon={<XCircle />}
                  onClick={handleReject}
                >
                  REPROVAR
                </Button>
              </ButtonContainer>
            )}
          </>
        )}
      </S.ContainerDashboard>
    </ContentWrapper>
  )
}

export default authenticatedRoute(PerfilVoluntario, {
  allowedRoles: [UserType.ADMINISTRADOR]
})

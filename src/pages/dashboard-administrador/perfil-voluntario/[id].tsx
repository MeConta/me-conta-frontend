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
  SaveLinkWrapper,
  ModalTitle,
  ModalSubTitle,
  ExclamationIcon
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
import Modal from 'components/molecules/Modal'
import { useBeforeUnload } from 'hooks/beforeunload.hook'
import { handleBeforeUnload } from 'utils/handlers/handleBeforeUnload'

const ERRORS = {
  REQUIRED_FIELD: 'Campo obrigatório'
}

function PerfilVoluntario() {
  const [volunteer, setVolunteer] = useState<Volunteer | null>(null)
  const [linkError, setLinkError] = useState<string>('')
  const [sessionLink, setSessionLink] = useState<string>('')
  const [disableButtonLink, setDisableButtonLink] = useState<boolean>(true)
  const [isLoading, setLoading] = useState<boolean>(true)
  const [isModelEnabled, setModalEnable] = useState<boolean>(false)
  const [enableModalBrowserExit, setEnableModalBrowserExit] =
    useState<boolean>(false)
  const [isAprovalModalEnabled, setAprovalModalEnable] =
    useState<boolean>(false)
  const [isRejectModalEnabled, setRejectModalEnable] = useState<boolean>(false)
  const { emit } = useToast()
  const volunteerService = new VolunteerService(api)

  const goBack = async function () {
    await router.push('/dashboard-administrador')
  }

  useBeforeUnload(handleBeforeUnload, enableModalBrowserExit)

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
    if (router.query.id) {
      fetchVolunteer(Number(router.query.id))
    }
  }, [router.query.id])

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
  const failToSendEmailToast =
    'Erro ao enviar e-mail. Por favor, tente novamente'

  function showErrorFeedback(messageInput: string) {
    emit({
      type: ToastType.ERROR,
      message: messageInput
    })
  }

  function handleApproval() {
    if (volunteer && sessionLink) {
      volunteerService
        .approve(volunteer?.usuario.id, sessionLink)
        .then(() => {
          showSuccessFeedback(successMessageUpdate)
        })
        .catch((error) => {
          setLinkError(formatErrorMessage(error?.response?.data?.message[0]))
          showErrorFeedback(failToSendEmailToast)
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
          showErrorFeedback(failToSendEmailToast)
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
          setEnableModalBrowserExit(false)
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
    <>
      <>
        {isModelEnabled ? (
          <HandleModalExit isModelEnabled={isModelEnabled}></HandleModalExit>
        ) : (
          <></>
        )}
      </>

      <>
        {isAprovalModalEnabled ? (
          <HandleApprovalModal
            isAprovalModalEnabled={isAprovalModalEnabled}
          ></HandleApprovalModal>
        ) : (
          <></>
        )}
      </>

      <>
        {isRejectModalEnabled ? (
          <HandleRejectModal
            isRejectModalEnabled={isRejectModalEnabled}
          ></HandleRejectModal>
        ) : (
          <></>
        )}
      </>

      <ContentWrapper>
        <TitleContainer>
          <S.Title> Perfil - Voluntário </S.Title>
          <Button
            onClick={() => {
              if (enableModalBrowserExit) {
                setModalEnable(true)
              } else {
                goBack()
              }
            }}
            btnStyle="link"
            prefixIcon={<ArrowLeft />}
          >
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
                    placeholder="Insira aqui o link para as sessões"
                    onChange={(e) => {
                      setSessionLink(e.target.value)
                      setDisableButtonLink(false)
                      setEnableModalBrowserExit(true)
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
                      size="smallMedium"
                      prefixIcon={<SaveIcon />}
                      onClick={() => {
                        handleSaveLink()
                        setDisableButtonLink(true)
                      }}
                      disabled={disableButtonLink}
                    >
                      <span>SALVAR LINK</span>
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
                    onClick={() => {
                      sessionLink
                        ? setAprovalModalEnable(true)
                        : showLinkError(sessionLink)
                    }}
                  >
                    APROVAR
                  </Button>
                  <Button
                    color="secondary"
                    radius="square"
                    size="xMedium"
                    sufixIcon={<XCircle />}
                    onClick={() => {
                      setRejectModalEnable(true)
                    }}
                  >
                    REPROVAR
                  </Button>
                </ButtonContainer>
              )}
            </>
          )}
        </S.ContainerDashboard>
      </ContentWrapper>
    </>
  )

  type GoBackToDashboardModalProps = {
    isModelEnabled: boolean
  }

  function HandleModalExit({ isModelEnabled }: GoBackToDashboardModalProps) {
    return (
      <>
        <Modal
          isEnabled={isModelEnabled}
          funcCloseButton={() => setModalEnable(false)}
        >
          <ModalTitle>Sair da página?</ModalTitle>
          <ModalSubTitle>As alterações não serão salvas.</ModalSubTitle>
          <ButtonContainer>
            <Button btnStyle="link" onClick={() => setModalEnable(false)}>
              Cancelar
            </Button>
            <Button
              color="secondary"
              radius="square"
              size="xMedium"
              onClick={() => {
                setModalEnable(false)
                goBack()
              }}
            >
              Sair
            </Button>
          </ButtonContainer>
        </Modal>
      </>
    )
  }

  type HandleApprovalModalProps = {
    isAprovalModalEnabled: boolean
  }

  function HandleApprovalModal({
    isAprovalModalEnabled
  }: HandleApprovalModalProps) {
    return (
      <>
        <Modal
          height="350px"
          isEnabled={isAprovalModalEnabled}
          funcCloseButton={() => setAprovalModalEnable(false)}
        >
          <ModalTitle>
            Tem certeza que deseja aprovar o voluntário(a)?
          </ModalTitle>
          <ModalSubTitle>
            <ExclamationIcon />
            Um e-mail informando o status será enviado ao Voluntário
          </ModalSubTitle>
          <ButtonContainer>
            <Button
              btnStyle="link"
              onClick={() => setAprovalModalEnable(false)}
            >
              Cancelar
            </Button>
            <Button
              color="success"
              radius="square"
              size="smallMedium"
              onClick={() => {
                setAprovalModalEnable(false)
                handleApproval()
              }}
            >
              Sim, Aprovar
            </Button>
          </ButtonContainer>
        </Modal>
      </>
    )
  }

  type HandleRejectModalProps = {
    isRejectModalEnabled: boolean
  }

  function HandleRejectModal({ isRejectModalEnabled }: HandleRejectModalProps) {
    return (
      <>
        <Modal
          height="350px"
          isEnabled={isRejectModalEnabled}
          funcCloseButton={() => setRejectModalEnable(false)}
        >
          <ModalTitle>
            Tem certeza que deseja reprovar o voluntário(a)?
          </ModalTitle>
          <ModalSubTitle>
            <ExclamationIcon />
            Um e-mail informando o status será enviado ao Voluntário
          </ModalSubTitle>
          <ButtonContainer>
            <Button btnStyle="link" onClick={() => setRejectModalEnable(false)}>
              Cancelar
            </Button>
            <Button
              color="secondary"
              radius="square"
              size="smallMedium"
              onClick={() => {
                setRejectModalEnable(false)
                handleReject()
              }}
            >
              Sim, Reprovar
            </Button>
          </ButtonContainer>
        </Modal>
      </>
    )
  }
}

export default authenticatedRoute(PerfilVoluntario, {
  allowedRoles: [UserType.ADMINISTRADOR]
})

import Banner from 'components/atoms/Banner'
import { Button } from 'components/atoms/Button'
import * as S from './styles'

type VolunteerStatusBannerProps = {
  approvalStatus: boolean | undefined | null
}

export default function VolunteerStatusBanner({
  approvalStatus
}: VolunteerStatusBannerProps) {
  const bannerContent = GetBannerContent(approvalStatus)
  return <Banner>{bannerContent}</Banner>
}

function GetBannerContent(
  approvalStatus: boolean | undefined | null
): React.ReactElement {
  switch (approvalStatus) {
    case true:
      return <ContentApprovedVolunteerBanner></ContentApprovedVolunteerBanner>
    case false:
      return <ContentReprovedVolunteerBanner></ContentReprovedVolunteerBanner>
    default:
      return <ContentUndefinedVolunteerBanner></ContentUndefinedVolunteerBanner>
  }
}

function ContentApprovedVolunteerBanner() {
  return (
    <S.BannerContent data-testid="approved-banner">
      <S.BannerTitle>
        Bem-vindo(a) ao <strong>MeConta!</strong>
      </S.BannerTitle>
      <S.BannerText role="paragraph">
        Sua agenda está vazia. Comece adicionando horários para obter sessões.
      </S.BannerText>
      <Button color="secondary" radius="square" size="mediumLarge">
        INCLUIR HORÁRIOS
      </Button>
    </S.BannerContent>
  )
}

function ContentReprovedVolunteerBanner() {
  return (
    <S.BannerContent data-testid="reproved-banner">
      <S.BannerTitle>
        Status: <strong>Não aprovado</strong>
      </S.BannerTitle>
      <S.BannerText role="paragraph">
        Seu perfil não atendeu aos critérios. Caso haja alguma dúvida, entre em
        contato conosco pelo e-mail <strong>central@meconta.org.</strong>
      </S.BannerText>
    </S.BannerContent>
  )
}

function ContentUndefinedVolunteerBanner() {
  return (
    <S.BannerContent data-testid="undefined-banner">
      <S.BannerTitle>
        Bem-vindo(a) ao <strong>MeConta!</strong>
      </S.BannerTitle>
      <S.BannerText role="paragraph">
        Nossa equipe irá analisar seu perfil e entrará em{' '}
        <strong>contato por e-mail</strong> em breve.
      </S.BannerText>
    </S.BannerContent>
  )
}

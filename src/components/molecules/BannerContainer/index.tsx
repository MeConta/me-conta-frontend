import Banner from 'components/atoms/Banner'

type BannerContainerProps = {
  approvalStatus: boolean | undefined | null
}

export default function BannerContainer({
  approvalStatus
}: BannerContainerProps) {
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
    <div>
      <h1>Bem-vindo(a) ao MeConta!</h1>
      <p>
        Sua agenda está vazia. Comece adicionando horários para obter sessões.
      </p>
      <button>INCLUIR HORÁRIOS</button>
    </div>
  )
}

function ContentReprovedVolunteerBanner() {
  return (
    <div>
      <h1>Status: Não aprovado</h1>
      <p>
        Seu perfil não atendeu aos critérios. Caso haja alguma dúvida, entre em
        contato conosco pelo e-mail central@meconta.org.
      </p>
    </div>
  )
}

function ContentUndefinedVolunteerBanner() {
  return (
    <div>
      <h1>Bem-vindo(a) ao MeConta!</h1>
      <p>
        Nossa equipe irá analisar seu perfil e entrará em contato por e-mail em
        breve.
      </p>
    </div>
  )
}

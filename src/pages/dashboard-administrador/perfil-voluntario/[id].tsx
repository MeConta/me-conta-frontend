import { UserType } from 'enums/user-type.enum'
import { authenticatedRoute } from '../../../utils/authentication/authenticationRoute'
import * as S from '../../../styles/pages/dashboards/styles'
import { TitleContainer } from '../../../styles/pages/dashboards/dashboard-administrador/perfil-voluntario/styles'
// import Image from 'next/image'
// import arrowLeft from '../../../../public/assets/volunteer/arrowLeft.png'

function PerfilVoluntario() {
  return (
    <S.WrapperDashboard>
      <TitleContainer>
        <S.Title> Perfil - Voluntário </S.Title>
        <button>
          {/* <Image src={arrowLeft} alt="Voltar ao Dashboard" /> */}
          Voltar ao Dashboard
        </button>
      </TitleContainer>
      <S.ContainerDashboard></S.ContainerDashboard>
    </S.WrapperDashboard>
  )
}
export default authenticatedRoute(PerfilVoluntario, {
  allowedRoles: [UserType.ADMINISTRADOR]
})

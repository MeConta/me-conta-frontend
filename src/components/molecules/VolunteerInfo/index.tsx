import * as S from './styles'
import { Avatar } from '../../atoms/Avatar/index'
import { FrentesInfoMaterialUi } from 'components/atoms/Frentes/frentesInfo'

export type VolunteerInfoProps = {
  name: string
  email?: string
  frentes: Array<number>
}

export function VolunteerInfo({ name, email, frentes }: VolunteerInfoProps) {
  return (
    <S.Wrapper>
      <div className="avatarAndInfoContainer">
        <Avatar name={name} email={email} />
        <div className="info">{name}</div>

        {FrentesInfoMaterialUi.filter((item) => frentes.includes(item.id)).map(
          (obj) => (
            // eslint-disable-next-line react/jsx-key
            <S.WrapperImageIcon backgroundColor={obj.backgroundColor}>
              {obj.icon}
            </S.WrapperImageIcon>
          )
        )}
      </div>
    </S.Wrapper>
  )
}

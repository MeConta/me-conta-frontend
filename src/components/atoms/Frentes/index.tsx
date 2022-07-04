import * as S from './styles'
import { FrentesInfo } from './frentesInfo'
import ImageIcon from '../ImageIcon'

export type FrentesProps = {
  frentes: Array<number>
}

export default function Frentes({ frentes }: FrentesProps) {
  return (
    <S.Wrapper>
      {FrentesInfo.filter((item) => frentes.includes(item.id)).map((obj) => (
        <ImageIcon
          key={obj.value}
          imageSrc={obj.imageSrc}
          imageAlt={obj.imageAlt}
          imageHeight={24}
          imageWidth={24.63}
          backgroundColor={obj.backgroundColor}
          tooltip={obj.text}
        />
      ))}
    </S.Wrapper>
  )
}

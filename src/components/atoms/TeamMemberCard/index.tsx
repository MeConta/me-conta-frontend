import { TeamMember } from 'components/molecules/Carousel'
import Image from 'next/image'

export interface TeamMemberCardProps extends TeamMember {}

import * as S from './styles'

export function TeamMemberCard({
  imageAlt,
  imageSrc,
  name,
  title
}: TeamMemberCardProps) {
  return (
    <S.Wrapper>
      {imageSrc && (
        // adicionar imagem padrão caso não tenha imageSrc definido
        <Image src={imageSrc} alt={imageAlt} width={150} height={200} />
      )}
      <h3>{name}</h3>
      <p>{title}</p>
    </S.Wrapper>
  )
}

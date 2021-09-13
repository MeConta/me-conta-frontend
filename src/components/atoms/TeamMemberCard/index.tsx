import { TeamMember } from 'components/molecules/Carousel'
import Image from 'next/image'

interface TeamMemberCardProps extends TeamMember {}

import * as S from './styles'

export function TeamMemberCard({
  imageAlt,
  imageSrc,
  name,
  title
}: TeamMemberCardProps) {
  return (
    <S.Wrapper>
      {/* <Image src={imageSrc} alt={imageAlt} width={150} height={200} /> */}
      <h3>{name}</h3>
      <p>{title}</p>
    </S.Wrapper>
  )
}

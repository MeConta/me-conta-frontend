import * as S from './styles'

type SectionDetailsTextProps = {
  label: string
  value: string | number
}

export default function SectionDetailsText({
  label,
  value
}: SectionDetailsTextProps) {
  return (
    <S.SectionDetailsText>
      <S.SectionDetailsTextHighlight>{label}: </S.SectionDetailsTextHighlight>
      {value}
    </S.SectionDetailsText>
  )
}

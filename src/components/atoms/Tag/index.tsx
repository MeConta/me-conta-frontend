import * as S from './styles'

type TagProps = {
  title: string
  titleColor: string
  backgroundColor: string
}

export default function Tag({ title, titleColor, backgroundColor }: TagProps) {
  return (
    <S.WrapperTag
      color={titleColor}
      backgroundColor={backgroundColor}
      data-testid="tag"
    >
      <S.TextTag>{title}</S.TextTag>
    </S.WrapperTag>
  )
}

import * as S from './styles'

type TagProps = {
  title: string
  titleColor: string
  backgroundColor: string
}

export default function Tag({
  title,
  titleColor,
  backgroundColor,
  ...props
}: TagProps) {
  return (
    <S.WrapperTag
      color={titleColor}
      backgroundColor={backgroundColor}
      data-testid="tag"
      {...props}
    >
      <S.TextTag>{title}</S.TextTag>
    </S.WrapperTag>
  )
}

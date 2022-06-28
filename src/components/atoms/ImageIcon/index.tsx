import * as S from './styles'
import Image from 'next/image'

type ImageIconProps = {
  imageSrc: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  backgroundColor: string
  tooltip: string
}

export default function ImageIcon({
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  backgroundColor,
  tooltip
}: ImageIconProps) {
  return (
    <S.WrapperImageIcon backgroundColor={backgroundColor}>
      <Image
        src={imageSrc}
        alt={imageAlt}
        width={imageWidth}
        height={imageHeight}
      />
      <S.Tooltip>{tooltip}</S.Tooltip>
    </S.WrapperImageIcon>
  )
}

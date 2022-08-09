import Image from 'next/image'
import * as S from './styles'

export type BannerProps = {
  children: React.ReactNode
  imageSrc?: string
}

export default function Banner({ children, imageSrc }: BannerProps) {
  const imagePath = imageSrc ?? '/illustrations/me-conta-card-illustration.svg'
  return (
    <S.WrapperDashboard data-testid="banner">
      <S.SectionContainer>
        <S.NewUserCard>
          {children}
          <S.NewUserCardIllustration>
            <S.IllustrationBackground />
            <Image
              id="illustration"
              alt="Illustration"
              src={imagePath}
              width={220}
              height={220}
            />
          </S.NewUserCardIllustration>
        </S.NewUserCard>
      </S.SectionContainer>
    </S.WrapperDashboard>
  )
}

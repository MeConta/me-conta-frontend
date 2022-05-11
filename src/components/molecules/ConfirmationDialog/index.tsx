import * as S from './styles'
import * as F from '../../../styles/form/styles'
import { ReactNode } from 'react'
import { Button } from 'components/atoms/Button'
import { WrapperForm } from '../WrapperForm'
import Logo from '../../../../public/assets/logo.png'
import router from 'next/router'

interface ConfirmationDialogProps {
  title?: ReactNode
  titleInfo?: {
    preText?: string
    boldText?: string
    posText?: string
  }
  subtitle?: ReactNode
  subtitleInfo?: {
    preText?: string
    boldText?: string
    posText?: string
  }
  buttonText: string
  buttonLink?: string
  logoSrc?: string | StaticImageData
}

export default function ConfirmationDialog({
  title,
  subtitle,
  titleInfo,
  subtitleInfo,
  buttonText,
  buttonLink,
  logoSrc = Logo
}: ConfirmationDialogProps) {
  const renderText = (
    text: {
      preText?: string
      boldText?: string
      posText?: string
    },
    size?: F.TextProps['size'],
    color?: F.TextProps['color']
  ) => {
    return (
      <F.Paragraph color={color} size={size}>
        {text.preText} <F.BoldParagraph>{text.boldText}</F.BoldParagraph>{' '}
        {text.posText}
      </F.Paragraph>
    )
  }

  return (
    <S.DivContainer>
      <WrapperForm
        borderPresent={false}
        padding="4rem 4.8rem"
        logoSize="small"
        shape="square"
        logoSrc={logoSrc}
      >
        {titleInfo ? (
          renderText(titleInfo, 'desk-xlarge', 'black')
        ) : (
          <F.Paragraph size="desk-xlarge">{title}</F.Paragraph>
        )}
        {subtitleInfo ? (
          renderText(subtitleInfo, undefined, 'black')
        ) : (
          <F.Paragraph color="black" size="desk-large">
            {subtitle}
          </F.Paragraph>
        )}
        <F.ButtonContainer>
          <Button
            radius="square"
            color="secondary"
            size="mediumLarge"
            onClick={() => router.push(buttonLink ?? '/')}
          >
            {buttonText}
          </Button>
        </F.ButtonContainer>
      </WrapperForm>
    </S.DivContainer>
  )
}

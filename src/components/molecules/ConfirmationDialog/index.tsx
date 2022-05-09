import * as S from './styles'
import * as F from '../../../styles/form/styles'
import { ReactNode } from 'react'
import { Button } from 'components/atoms/Button'
import { useRouter } from 'next/router'
import { WrapperForm } from '../WrapperForm'

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
}

export default function ConfirmationDialog({
  title,
  subtitle,
  titleInfo,
  subtitleInfo,
  buttonText,
  buttonLink
}: ConfirmationDialogProps) {
  const renderText = (
    text: {
      preText?: string
      boldText?: string
      posText?: string
    },
    size?: 'desk-large' | 'desk-xlarge' | undefined,
    color?: 'lightGray' | 'black' | 'ceriseRed' | 'mineShaft' | undefined
  ) => {
    return (
      <F.Paragraph color={color} size={size}>
        {text.preText} <F.BoldParagraph>{text.boldText}</F.BoldParagraph>{' '}
        {text.posText}
      </F.Paragraph>
    )
  }

  const router = useRouter()

  return (
    <S.DivContainer>
      <WrapperForm borderPresent={false} padding="4rem 4.8rem">
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

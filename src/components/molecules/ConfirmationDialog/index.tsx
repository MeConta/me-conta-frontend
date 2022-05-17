import * as S from './styles'
import * as F from '../../../styles/form/styles'
import { ReactNode, useEffect } from 'react'
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
  reload?: () => void
  buttonColor?: 'primary' | 'secondary'
  logoSrc?: string | StaticImageData
  isModal?: boolean
}

export default function ConfirmationDialog({
  title,
  subtitle,
  titleInfo,
  subtitleInfo,
  buttonText,
  buttonLink,
  logoSrc = Logo,
  isModal,
  buttonColor,
  reload
}: ConfirmationDialogProps) {
  const renderText = (
    text: {
      preText?: string
      boldText?: string
      posText?: string
    },
    type: 'title' | 'subtitle',
    size?: F.TextProps['size'],
    color?: F.TextProps['color']
  ) => {
    return (
      <F.Paragraph color={color} size={size} id={`dialog-${type}`}>
        {text.preText} <F.BoldParagraph>{text.boldText}</F.BoldParagraph>{' '}
        {text.posText}
      </F.Paragraph>
    )
  }

  useEffect(() => {
    document.getElementById('dialog-button')?.focus()
  }, [])

  const keepFocusInsideDialog = (e: any) => {
    if (e.code === 'Tab' && isModal) {
      e.preventDefault()
    }
  }

  const modalProps = {
    role: 'dialog',
    'aria-modal': 'true',
    'aria-labelledby': 'dialog-title',
    'aria-describedby': 'dialog-subtitle'
  }

  const extraProps = () => (isModal ? modalProps : {})

  return (
    <S.DivContainer
      data-testid="confirmation-dialog"
      isModal={isModal}
      onKeyDown={keepFocusInsideDialog}
    >
      <WrapperForm
        borderPresent={false}
        padding="4rem 2.8rem"
        logoSize="small"
        shape="square"
        logoSrc={logoSrc}
        {...extraProps()}
      >
        {titleInfo ? (
          renderText(titleInfo, 'title', 'desk-xlarge', 'black')
        ) : (
          <F.Paragraph size="desk-xlarge" id="dialog-title">
            {title}
          </F.Paragraph>
        )}
        {subtitleInfo ? (
          renderText(subtitleInfo, 'subtitle', undefined, 'black')
        ) : (
          <F.Paragraph color="black" size="desk-large" id="dialog-subtitle">
            {subtitle}
          </F.Paragraph>
        )}
        <F.ButtonContainer>
          <Button
            radius="square"
            size="mediumLarge"
            color={buttonColor}
            onClick={() => (reload ? reload() : router.push(buttonLink ?? '/'))}
            id="dialog-button"
          >
            {buttonText}
          </Button>
        </F.ButtonContainer>
      </WrapperForm>
    </S.DivContainer>
  )
}

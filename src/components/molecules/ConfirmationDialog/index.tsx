import * as S from './styles'
import * as F from '../../../styles/form/styles'
import { ReactNode, useEffect, useState } from 'react'
import { Button } from 'components/atoms/Button'
import { WrapperForm } from '../WrapperForm'
import router from 'next/router'
import useDelayUnmount from 'utils/animations/useDelayUnmount'
import CloseButton from 'components/atoms/CloseButton'

type InfoHeader = {
  preText?: string
  boldText?: string
  posText?: string
}

interface ConfirmationDialogProps {
  title?: ReactNode
  titleInfo?: InfoHeader
  subtitle?: ReactNode
  subtitleInfo?: InfoHeader
  buttonText: string
  buttonLink?: string
  buttonAction?: () => void
  buttonColor?: 'primary' | 'secondary'
  isModal?: boolean
  isClosable?: boolean
}

export default function ConfirmationDialog({
  title,
  subtitle,
  titleInfo,
  subtitleInfo,
  buttonText,
  buttonLink,
  isModal,
  isClosable,
  buttonColor,
  buttonAction
}: ConfirmationDialogProps) {
  const [isVisible, setVisible] = useState(true)
  const [modalElement, setModalElement] = useState<any>()

  useEffect(() => {
    const trapFocus = (element: HTMLElement) => {
      const firstFocusableEl = element.querySelector(
        '#close-button, a[href]:not([disabled])'
      ) as HTMLElement
      const lastFocusableEl = element.querySelector(
        '#dialog-button'
      ) as HTMLElement
      firstFocusableEl?.focus()
      element.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          if (e.shiftKey) {
            if (document.activeElement === firstFocusableEl) {
              lastFocusableEl?.focus()
              e.preventDefault()
            }
          } else {
            if (document.activeElement === lastFocusableEl) {
              firstFocusableEl?.focus()
              e.preventDefault()
            }
          }
        }
      })
    }

    const modal = document.getElementById('modal') as HTMLElement
    setModalElement(modal)

    if (modal !== null) trapFocus(modal)
  }, [isModal, modalElement])

  const modalProps = {
    role: 'dialog',
    'aria-modal': 'true',
    'aria-labelledby': 'dialog-title',
    'aria-describedby': 'dialog-subtitle'
  }

  const extraProps = () => isModal && modalProps

  return useDelayUnmount(isVisible) ? (
    <S.DivContainer
      data-testid="confirmation-dialog"
      isModal={isModal}
      isVisible={isVisible}
    >
      <WrapperForm
        borderPresent={false}
        padding="4rem 2.8rem"
        logoSize="small"
        shape="square"
        id={isModal ? 'modal' : ''}
        actionItems={
          isModal && isClosable
            ? [
                <CloseButton
                  key={'button'}
                  onClick={() => setVisible(false)}
                ></CloseButton>
              ]
            : []
        }
        {...extraProps()}
      >
        {titleInfo ? (
          renderText(titleInfo, 'title', 'desk-xlarge', 'black')
        ) : (
          <F.ParagraphContainer size="desk-xlarge" id="dialog-title">
            {title}
          </F.ParagraphContainer>
        )}
        {subtitleInfo ? (
          renderText(subtitleInfo, 'subtitle', undefined, 'black')
        ) : (
          <F.ParagraphContainer
            color="black"
            size="desk-large"
            id="dialog-subtitle"
          >
            {subtitle}
          </F.ParagraphContainer>
        )}
        <F.ButtonContainer marginTop="4rem">
          <Button
            radius="square"
            size="mediumLarge"
            color={buttonColor}
            onClick={() =>
              buttonAction ? buttonAction() : router.push(buttonLink ?? '/')
            }
            id="dialog-button"
          >
            {buttonText}
          </Button>
        </F.ButtonContainer>
      </WrapperForm>
    </S.DivContainer>
  ) : (
    <div data-testid="empty"></div>
  )
}

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
    <F.ParagraphContainer id={`dialog-${type}`}>
      <F.Paragraph color={color} size={size}>
        {text.preText} <F.BoldParagraph>{text.boldText}</F.BoldParagraph>{' '}
        {text.posText}
      </F.Paragraph>
    </F.ParagraphContainer>
  )
}

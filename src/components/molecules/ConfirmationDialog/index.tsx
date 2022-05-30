import * as S from './styles'
import * as F from '../../../styles/form/styles'
import { ReactNode, useEffect, useState } from 'react'
import { Button } from 'components/atoms/Button'
import { WrapperForm } from '../WrapperForm'
import { Close } from '@styled-icons/material'
import Logo from '../../../../public/assets/logo.png'
import router from 'next/router'
import useDelayUnmount from 'utils/animations/unmountHelper'

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
  buttonAction?: () => void
  buttonColor?: 'primary' | 'secondary'
  logoSrc?: string | StaticImageData
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
  logoSrc = Logo,
  isModal,
  isClosable,
  buttonColor,
  buttonAction
}: ConfirmationDialogProps) {
  const [isVisible, setVisible] = useState(true)

  const trapFocus = (element: HTMLElement) => {
    const firstFocusableEl = element.querySelector(
      'a[href]:not([disabled])'
    ) as HTMLElement
    const lastFocusableEl = element.querySelector(
      '#dialog-button'
    ) as HTMLElement
    console.log('first element', firstFocusableEl)
    console.log('last element', lastFocusableEl)
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

  useEffect(() => {
    const modal = document.getElementById('modal') as HTMLElement
    if (modal !== null) trapFocus(modal)
  }, [])

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
        logoSrc={logoSrc}
        {...extraProps()}
      >
        {isModal && isClosable && (
          <S.CloseButton id="close-button" data-testid="close">
            <Close
              size={'24'}
              color={'#5f5f5f'}
              onClick={() => setVisible(false)}
            />
          </S.CloseButton>
        )}
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
    <></>
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
    <F.Paragraph color={color} size={size} id={`dialog-${type}`}>
      {text.preText} <F.BoldParagraph>{text.boldText}</F.BoldParagraph>{' '}
      {text.posText}
    </F.Paragraph>
  )
}
function sleep(arg0: number) {
  throw new Error('Function not implemented.')
}

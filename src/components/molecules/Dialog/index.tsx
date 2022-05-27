import { ReactNode } from 'react'
import * as F from '../../../styles/form/styles'
import Logo from '../../../../public/assets/logo.png'
import { WrapperForm } from '../WrapperForm'
interface DialogProps {
  title?: ReactNode
  titleInfo?: {
    preText?: string
    boldText?: string
    posText?: string
  }
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

export default function Dialog({ title, titleInfo }: DialogProps) {
  return (
    <div>
      <WrapperForm
        borderPresent={false}
        padding="4rem 2.8rem"
        logoSize="small"
        shape="square"
        logoSrc={Logo}
      >
        {titleInfo ? (
          renderText(titleInfo, 'title', 'desk-xlarge', 'black')
        ) : (
          <F.Paragraph size="desk-xlarge" id="dialog-title">
            {title}
          </F.Paragraph>
        )}
      </WrapperForm>
    </div>
  )
}

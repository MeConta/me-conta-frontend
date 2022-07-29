import styled, { css } from 'styled-components'
import { Link } from '@styled-icons/evaicons-solid'
import { Exclamation } from 'styled-icons/bootstrap'
import theme from '../../../../theme'
import { TextProps } from 'styles/form/styles'

const screenBreakingPoint = '895px'

type SectionDetailsProps = {
  width: string
  alignItens?: string
}

type ParagraphProps = Pick<TextProps, 'size' | 'margin' | 'color' | 'weight'>

export const TitleContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-left: 9px;

  button {
    padding: 0;
  }

  @media (max-width: ${screenBreakingPoint}) {
    flex-direction: column-reverse;
    align-items: start;
  }
`
export const ContentWrapper = styled.div`
  max-width: 80%;
  width: 80rem;
  display: flex;
  flex-direction: column;
  min-height: 70vh;
  padding: 0 18px;
  margin: 4rem;

  @media (max-width: ${screenBreakingPoint}) {
    padding: 0;
    margin: 0;
    max-width: 90%;
  }
`

export const SectionDetailsContainer = styled.section`
  display: flex;

  @media (max-width: ${screenBreakingPoint}) {
    flex-direction: column;
  }
`

export const LinkIcon = styled(Link)`
  display: flex;
  color: ${theme.colors.gray};

  width: 22.84px;
  height: 24px;
`

export const SectionDetails = styled.div<SectionDetailsProps>`
  ${({ width, alignItens }) => css`
    width: ${width};

    ${alignItens === 'right' &&
    `
      display: flex;
      flex-direction: column;
      align-items: end; 
    `}

    @media (max-width: ${screenBreakingPoint}) {
      width: 100%;
      align-items: start;
    }
  `}
`
export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 4rem;

  @media (max-width: ${screenBreakingPoint}) {
    flex-direction: column;
    gap: 16px;
  }
`
export const SectionLinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-top: 15px;
`
export const FieldLinkWrapper = styled.div`
  flex-grow: 3;
`

export const SaveLinkWrapper = styled.div`
  flex-grow: 0;
  margin-top: 3.7rem;

  span {
    @media (max-width: ${screenBreakingPoint}) {
      display: none;
    }
  }
`
export const ModalTitle = styled.p<ParagraphProps>`
  ${({ theme, size, margin, weight }) => css`
    text-align: center;
    padding: 1rem;
    margin: ${margin ? theme.spacings[margin] : theme.zero};
    font-size: ${theme.font.sizes[size ?? 'desk-xxlarge']};
    font-weight: ${weight ?? theme.font.bold};
  `}
`
export const ModalSubTitle = styled.p<ParagraphProps>`
  ${({ theme, size, margin, color, weight }) => css`
    text-align: center;
    padding: 2rem 6rem;
    color: ${theme.colors[color ?? 'lightGray']};
    margin: ${margin ? theme.spacings[margin] : theme.zero};
    font-size: ${theme.font.sizes[size ?? 'desk-glarge']};
    font-weight: ${weight ?? theme.font.normal};
  `}
`

export const ExclamationIcon = styled(Exclamation)`
  color: ${theme.colors.gray};
  width: 22px;
  height: 22px;
  border: solid 2px;
  border-radius: 100px;
  margin-right: 1rem;
`

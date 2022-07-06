import styled, { css } from 'styled-components'

export const SectionDetailsText = styled.p`
  ${({ theme }) => css`
    font-family: ${theme.font.family};
    font-weight: ${theme.font.normal};
    font-size: ${theme.font.sizes['desk-large']};
    line-height: 30px;
  `}
`

export const SectionDetailsTextHighlight = styled.b`
  ${({ theme }) => css`
    font-weight: ${theme.font.semibold};
  `}
`

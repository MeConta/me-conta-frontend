import styled, { css } from 'styled-components'

export const Title = styled.p`
  ${({ theme }) => css`
    font-weight: 400;
    font-size: ${theme.font.sizes['desk-large']};
    margin-bottom: ${theme.spacings.xsmall};
  `}
`

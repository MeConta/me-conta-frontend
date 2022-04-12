import styled, { css } from 'styled-components'

export const RowContainer = styled.tr`
  ${({ theme }) => css`
    width: 100%;
    border-radius: 4px;
    background: ${theme.colors.cornflowerBlue};
  `}
`

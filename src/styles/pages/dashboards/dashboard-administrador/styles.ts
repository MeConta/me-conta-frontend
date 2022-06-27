import styled, { css } from 'styled-components'

export const TableContainer = styled.table`
  ${({ theme }) => css`
    > tr > th,
    td {
      text-align: left;
      padding-top: ${theme.spacings.xsmall};
    }
  `}
`

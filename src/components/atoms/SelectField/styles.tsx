import styled, { css } from 'styled-components'

// export const DefaultOption = styled.option`
//   ${({ theme }) => css`
//     color: ${theme.colors.lightGray};
//   `}
// `
export const Select = styled.select`
  ${({ theme }) => css`
    color: ${theme.colors.black};
    font-family: ${theme.font.family};
    font-size: ${theme.font.sizes['desk-large']};
    padding: 0.5rem 0;
    background: transparent;
    border: 0;
    outline: none;
    width: 100%;
  `}
`

import styled, { css } from 'styled-components'

export const Icon = styled.div`
  ${({ theme }) => css`
    display: flex;
    color: ${theme.colors.gray};
    order: 1;

    & > svg {
      width: 2rem;
      height: 100%;
    }
  `}
`

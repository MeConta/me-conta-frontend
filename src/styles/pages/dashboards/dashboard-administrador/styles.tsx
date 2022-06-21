import styled, { css } from 'styled-components'

export const WrapperFilter = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: row;
    gap: ${theme.spacings.medium};
    text-align: center;
    width: 100%;
  `}
`
export const ButtonFilter = styled.button`
  ${({ theme }) => css`
    color: ${theme.colors.cornflowerBlue};
    background-color: transparent;
    border: 0;
    font-size: ${theme.font.sizes['desk-large']};
    font-weight: ${theme.font.bold};
    padding: 1rem 2rem;
  `}
`

import styled, { css } from 'styled-components'

export const Button = styled.button`
  ${({ theme }) => css`
    color: ${theme.colors.white};
    background: ${theme.colors.cornflowerBlue};
    border: 0;
    border-radius: ${theme.border['btn-radius']};
    font-size: ${theme.font.sizes['desk-xlarge']};
    height: 5rem;
    padding: ${theme.spacings.xxsmall} ${theme.spacings.xxlarge};

    &:hover {
      background-color: ${theme.colors.cobalt};
      transition: background-color 0.2s;
    }
  `}
`

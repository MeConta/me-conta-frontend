import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border: 0.1rem inset ${theme.colors.powderAsh};
    border-radius: ${theme.border['btn-square-radius']};
    padding: ${theme.spacings.large} ${theme.spacings.xxsmall};

    @media only screen and (max-width: 450px) {
      border: 0;
    }
  `}
`

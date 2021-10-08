import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border: 0.1rem solid ${theme.colors.powderAsh};
    border-radius: ${theme.border['btn-square-radius']};
    padding: ${theme.spacings.large} ${theme.spacings.xxsmall};
    max-width: 50%;
    margin: 1.5rem 0;
    a {
      margin: 0 0 2rem 0;
    }

    @media only screen and (max-width: 450px) {
      border: 0;
      max-width: 100%;
    }
  `}
`

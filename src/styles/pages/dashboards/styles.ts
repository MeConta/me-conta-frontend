import styled, { css } from 'styled-components'

export const WrapperDashboard = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    min-height: 70vh;
    width: 100%;
    max-width: 1360px;
    padding: 0 18px;
  `}
`

export const SectionTitle = styled.h1`
  ${({ theme }) => css`
    font-family: ${theme.font.family};
    font-weight: ${theme.font.semibold};
    font-size: 16px;
    margin: 27px 0;
  `}
`

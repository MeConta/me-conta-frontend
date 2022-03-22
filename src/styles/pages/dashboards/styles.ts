import styled, { css } from 'styled-components'

export const WrapperDashboard = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    min-height: 70vh;
    min-width: 100%;
    padding: 5rem 20rem;
  `}
`

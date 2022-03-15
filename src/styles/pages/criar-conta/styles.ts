import styled, { css } from 'styled-components'

export const Link = styled.div`
  text-align: center;
  margin-top: 1.5rem;
`

export const RequiredFieldsLabelContainer = styled.div`
  & p {
    text-align: center;
  }

  ${({ theme }) => css`
    margin-top: ${theme.spacings.xsmall};
  `}
`

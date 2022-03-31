import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 400px;
    height: 180px;
    background-color: ${theme.colors.white};
    padding: ${theme.spacings.small};
    border-radius: ${theme.border['card-radius']};
    border: solid ${theme.colors.lightGray} 1px;

    @media (max-width: 768px) {
      padding: 24px 5px;
    }

    .title {
      font-size: ${theme.font.sizes['desk-large']};
      color: ${theme.colors.gray};
      font-weight: ${theme.font.bold};
      line-height: 21px;
      margin-left: ${theme.spacings.xsmall};
      margin-top: ${theme.spacings.xsmall};
    }

    .description {
      font-size: ${theme.font.sizes['desk-large']};
      color: ${theme.colors.lightGray};
      font-weight: ${theme.font.normal};
      line-height: 21px;
      margin-left: ${theme.spacings.xsmall};
    }
  `}
`

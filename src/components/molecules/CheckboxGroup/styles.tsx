import styled, { css } from 'styled-components'

type WrapperProps = {
  errorActive: boolean
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, errorActive }) => css`
    margin-bottom: ${theme.spacings.xsmall};

    > legend,
    p {
      ${!!errorActive && `color: ${theme.colors.ceriseRed}`}
    }
  `}
`

export const Label = styled.legend`
  ${({ theme }) => css`
    font-size: ${theme.font.sizes['desk-large']};
    font-weight: ${theme.font.bold};
    color: ${theme.colors.lightGray};
    padding-bottom: 2px;

    &[aria-required='true']:after {
      content: ' *';
      color: ${theme.colors.ceriseRed};
    }
  `}
`

export const CheckboxGroup = styled.fieldset`
  ${({ theme }) => css`
    margin: ${theme.spacings.xxsmall} 0;
    border: none;
  `}
`
export const Error = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.ceriseRed};
    font-size: ${theme.font.sizes['desk-xsmall']};
  `}
`
export const Subtitle = styled.p`
  ${({ theme }) => css`
    color: ${theme.colors.lightGray};
    font-size: ${theme.font.sizes['desk-small']};
  `}
`

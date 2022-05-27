import styled, { css } from 'styled-components'

type CharCounterProps = {
  error?: string
}

export const TextArea = styled.textarea`
  ${({ theme }) => css`
    color: ${theme.colors.black};
    font-family: ${theme.font.family};
    font-size: ${theme.font.sizes['desk-large']};
    padding: 0.5rem 0;
    background: transparent;
    border: 0;
    outline: none;
    width: 100%;

    &:disabled {
      cursor: not-allowed;
      color: ${theme.colors.gray};

      &::placeholder {
        color: currentColor;
      }
    }
  `}
`

export const CharCounter = styled.p<CharCounterProps>`
  ${({ theme, error }) => css`
    color: ${error ? theme.colors.ceriseRed : theme.colors.lightGray};
    font-weight: ${theme.font.bold};
    font-size: ${theme.font.sizes['desk-medium']};
    text-align: end;
  `}
`

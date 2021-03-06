import styled, { css } from 'styled-components'

export const InputWrapper = styled.div`
  ${({ theme }) => css`
    flex: 1;

    input {
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
    }
  `}
`

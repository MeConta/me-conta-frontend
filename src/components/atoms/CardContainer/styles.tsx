import styled, { css } from 'styled-components'

type WrapperProps = {
  boxShadowType: 'inset' | 'default'
}

const boxShadowTypes = {
  default: '10px 40px 50px rgba(229, 233, 246, 0.4)',
  inset: 'inset 10px 40px 50px rgba(229, 233, 246, 0.4)'
}

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, boxShadowType }) => css`
    width: 100%;
    background-color: ${theme.colors.white};
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${theme.spacings.xxsmall} ${theme.spacings.small}
      ${theme.spacings.small} ${theme.spacings.small};

    box-shadow: ${boxShadowTypes[boxShadowType]};
  `}
`

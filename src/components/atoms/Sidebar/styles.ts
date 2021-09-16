import styled, { css } from 'styled-components'
import { SidebarProps } from '.'

type WrapperProps = Omit<SidebarProps, 'handleCloseButton'>

export const Wrapper = styled.aside<WrapperProps>`
  ${({ theme, showSidebar }) => css`
    height: 100%;
    width: ${showSidebar ? '250px' : '0'};
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: ${theme.colors.malibu};
    overflow-x: hidden;
    transition: 0.5s;
    padding-top: ${theme.spacings.large};

    a {
      padding: ${theme.spacings.xxsmall} ${theme.spacings.xxsmall}
        ${theme.spacings.xxsmall} ${theme.spacings.small};
      text-decoration: none;
      font-size: ${theme.font.sizes['desk-xxlarge']};
      color: ${theme.colors.white};
      display: block;
      transition: 0.3s;
    }

    a:first-child {
      position: absolute;
      top: ${theme.spacings.xxsmall};
      right: ${theme.spacings.xsmall};
      cursor: pointer;
    }
  `}
`

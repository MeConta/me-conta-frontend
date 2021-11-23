import { AvatarProps } from '.'
import styled, { css } from 'styled-components'

type WrapperProps = Pick<
  AvatarProps,
  'size' | 'fontSize' | 'color' | 'backgroundColor'
>

export const Wrapper = styled.div<WrapperProps>`
  ${({ theme, size, fontSize, backgroundColor, color }) => css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: ${size}px;
    width: ${size}px;
    border-radius: 50%;
    overflow: hidden;
    background: ${backgroundColor};
    background-color: ${backgroundColor};

    .avatar-initials {
      position: absolute;
      left: 50%;
      right: 0;
      transform: translateX(-50%);
      text-align: center;
      color: ${color};
      font-size: ${fontSize}px;
      font-weight: ${theme.font.bold};
    }
  `}
`

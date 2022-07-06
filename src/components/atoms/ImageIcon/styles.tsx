import styled, { css } from 'styled-components'

type ImageIconProps = {
  backgroundColor: string
}

export const WrapperImageIcon = styled.div<ImageIconProps>`
  ${({ backgroundColor }) => css`
    display: flex;
    flex-direction: row;
    text-align: center;
    justify-content: center;
    background-color: ${backgroundColor ? backgroundColor : 'white'};
    border-radius: 50%;
    padding: 10px;
    position: relative;
    width: fit-content;
    &:hover span {
      visibility: visible;
    }
  `}
`

export const Tooltip = styled.span`
  ${() => css`
    visibility: hidden;
    background-color: #458ff6;
    color: #ffffff;
    text-align: center;
    border-radius: 6px;
    position: absolute;
    font-weight: 700;
    font-size: 13px;
    line-height: 20px;
    padding: 8px 12px 8px 12px;
    top: 115%;
    z-index: 1;
    white-space: nowrap;

    &::after {
      content: '';
      position: absolute;
      bottom: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent #458ff6 transparent;
    }
  `}
`

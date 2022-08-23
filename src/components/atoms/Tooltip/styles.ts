import styled, { css } from 'styled-components'

export const TooltipWrapper = styled.span`
  ${() => css`
    visibility: hidden;
    background-color: #747474;
    color: #ffffff;
    text-align: center;
    border-radius: 6px;
    position: absolute;
    font-weight: 700;
    font-size: 12px;
    line-height: 20px;
    padding: 8px 12px 8px 12px;
    top: 80%;
    z-index: 1;
    left: 430%;
    margin-left: -180px;

    &::after {
      content: '';
      position: absolute;
      bottom: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: transparent transparent #747474 transparent;
    }
  `}
`

export const Wrapper = styled.div`
  ${() => css`
    position: relative;
    width: fit-content;
    &:hover span {
      visibility: visible;
    }
  `}
`

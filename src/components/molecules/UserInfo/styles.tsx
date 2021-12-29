import { UserInfoProps } from '.'
import styled, { css } from 'styled-components'

type WrapperProps = Pick<UserInfoProps, 'width'>

export const Wrapper = styled.div<WrapperProps>`
  ${({ width }) => css`
     {
      display: flex;
      width: ${width}px;
      justify-content: space-between;
    }

    .avatarAndInfoContainer {
      display: flex;
      margin-left: 22px;
    }

    .info {
      display: flex;
      flex-direction: column;
      margin-left: 16px;
    }

    .name {
      font-size: 18px;
      color: #009ef7;
      line-height: 27px;
      font-weight: 500;
    }

    .profileLink {
      font-size: 14px;
      color: #a1a5b7;
      text-decoration: none;
      line-height: 21px;
      font-weight: 600;
    }

    .profileLink:hover {
      color: #f1416c;
    }
  `}
`

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${theme.colors.white};

    .no-dates-container {
      width: 100%;
      height: 50px;
    }

    .no-dates-container div {
      text-align: center;
      color: ${theme.colors.black};
      font-size: 13px;
    }

    .slider {
      width: calc(100% - 36px);
      padding: 0 20px;
    }

    .avaliable-time {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 140px;
      height: 140px;
      border-radius: 4px;
      margin: 0 auto;
      background-color: ${theme.colors.ceriseRed};
    }

    .date {
      font-size: ${theme.font.sizes['desk-large']};
      margin-bottom: 12px;
    }

    .time {
      font-size: ${theme.font.sizes['desk-xlarge']};
      font-weight: ${theme.font.bold};
      margin-bottom: 16px;
    }

    .delete {
      background: ${theme.colors.white};
      color: ${theme.colors.ceriseRed};
    }

    .delete:disabled {
      background: ${theme.colors.powderAsh};
    }

    .delete:not(:disabled):hover {
      background-color: ${theme.colors.maroonFlush};
      transition: background-color 0.2s;
      color: ${theme.colors.white};
    }
  `}
`

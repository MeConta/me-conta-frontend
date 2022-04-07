import styled, { css } from 'styled-components'

export const Wrapper = styled.div`
  ${({ theme }) => css`
    display: flex;
    width: 100%;

    .DayPicker-NavBar {
      position: absolute;
      right: 0;
    }

    .DayPicker-NavBar button {
      width: 20px;
      border: none;
      background: none;
      color: ${theme.colors.lightGray};
      transition: color ease 0.3s;
    }

    .DayPicker-NavBar button:hover {
      color: ${theme.colors.black};
    }

    .DayPicker-Month {
      margin: 0;
    }

    .DayPicker-Day {
      border-radius: 0;
      border: 1px solid ${theme.colors.xlightGray};
      box-sizing: border-box;
      padding: 0.8em;
      font-size: 14px;
    }

    .DayPicker-Day--today {
      color: ${theme.colors.ceriseRed};
    }

    .DayPicker-Weekday {
      font-size: 14px;
      color: ${theme.colors.black};
    }

    .DayPicker-Caption {
      text-transform: capitalize;
      padding: 0;
      font-family: ${theme.font.family};
      font-size: 16px;
    }
  `}
`

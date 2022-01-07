import styled from 'styled-components'

export const Wrapper = styled.header`
  border-bottom: 1px solid #e3e3e3;
  padding: 15px 0;
  background-color: #fff;

  .content {
    max-width: 1360px;
    margin: auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .menu-container {
    display: flex;
    align-items: center;
  }

  ul {
    display: flex;
    list-style-type: none;
  }

  li {
    margin-right: 18px;
  }

  a {
    text-decoration: none;
    font-size: 16px;
    color: #458ff6;
    font-weight: 500;
  }

  a:hover {
    text-decoration: underline;
  }
  .userinfo-container {
    display: flex;
    align-items: baseline;

    .greeting-container {
      b {
        font-weight: 700;
      }

      color: #747474;
      font-size: 16px;
    }

    button.logout {
      color: #de3163;
      font-weight: 500;
      background-color: transparent;
      border: 0;
      font-size: 16px;
      margin-left: 20px;
    }

    button.logout:hover {
      text-decoration: underline;
    }
  }
`

import styled from 'styled-components'

export const Wrapper = styled.header`
  background-color: #fff;
  border-bottom: 1px solid #e3e3e3;
  padding: 15px;
  position: absolute;
  top: 0;
  width: 100%;

  @media (max-width: 768px) {
    border: 0;
  }

  .content {
    max-width: 1360px;
    margin: auto;
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
      justify-content: center;
    }

    .open-menu-button {
      position: absolute;
      right: 20px;
      width: 2rem;
      height: 2rem;

      @media (min-width: 768px) {
        display: none;
      }
    }
  }

  .menu-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    @media (max-width: 768px) {
      &.open {
        display: flex;
      }
      display: none;

      position: absolute;
      flex-direction: column;
      justify-content: flex-start;
      background-color: #ffffff;
      padding: 20px 0;
      width: 100%;
      height: 100vh;
      top: 0;
      left: 0;

      nav {
        order: 2;
      }

      .close-menu-button {
        position: absolute;
        width: 2rem;
        height: 2rem;
        top: 20px;
        right: 20px;
      }
    }

    @media (min-width: 768px) {
      .close-menu-button {
        display: none;
      }
    }
  }

  ul {
    display: flex;
    list-style-type: none;

    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      margin-top: 20px;
    }
  }

  li {
    margin-right: 18px;

    @media (max-width: 768px) {
      margin: 0;
      padding: 12px 0;
    }
  }

  a {
    text-decoration: none;
    font-size: 16px;
    color: #458ff6;
    font-weight: 500;

    @media (max-width: 768px) {
      font-size: 18px;
    }
  }

  a:hover {
    text-decoration: underline;
  }

  .userinfo-container {
    display: flex;
    align-items: baseline;
    margin-left: auto;

    @media (max-width: 768px) {
      order: 1;
      flex-direction: column;
      justify-content: flex-start;
      width: 100%;
      padding: 0 20px;
    }

    .greeting-container {
      b {
        font-weight: 700;
      }

      color: #747474;
      font-size: 16px;
    }

    button.logout,
    button.login {
      color: #de3163;
      font-weight: 500;
      background-color: transparent;
      border: 0;
      font-size: 16px;
      margin-left: 20px;

      @media (max-width: 768px) {
        margin: 5px 0;
      }
    }

    button.logout:hover,
    button.login:hover {
      text-decoration: underline;
    }
  }
`

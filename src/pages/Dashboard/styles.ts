import styled, { css } from 'styled-components';
import { shade } from 'polished';

interface FormProps {
  hasError: boolean;
}

export const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
  padding: 40px 20px;

  > img {
    max-width: 110px;
  }
`;

export const ConfirmationDialog = styled.div`
  text-align: center;
  width: 500px;
  padding: 40px;
  background: #312e38;
  box-shadow: 0 20px 75px rgba(0, 0, 0, 0.23);
  color: #fff;

  p {
    padding-top: 10px;
    padding-bottom: 10px;
  }

  button {
    width: 160px;
    padding: 10px;
    border: 1px solid #fff;
    margin: 10px;
    cursor: pointer;
    background: none;
    color: #fff;
    font-size: 14px;
  }

  button + button {
    background: #ff9000;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  color: #ffffff;
  max-width: 355px;
  line-height: 33px;

  margin-top: 30px;
`;

export const Form = styled.form<FormProps>`
  margin-top: 20px;
  max-width: 960px;

  display: flex;

  input {
    flex: 1;
    height: 56px;
    padding: 0 24px;
    border: 0;
    border-radius: 5px 0 0 5px;
    color: #3a3a3a;
    border: 2px solid #fff;
    border-right: 0;

    ${(props) =>
      props.hasError &&
      css`
        border-color: #c53030;
      `}

    &::placeholder {
      color: #a8a8b3;
    }
  }

  button {
    width: 210px;
    height: 56px;
    background: #ff9000;
    border-radius: 0px 5px 5px 0px;
    border: 0px;
    color: #fff;
    font-weight: bold;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#ff9000')};
    }
  }
`;

export const Error = styled.span`
  display: block;
  color: #c53030;
  margin-top: 8px;
`;

export const Products = styled.div`
  margin-top: 50px;
  max-width: 960px;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-wrap: wrap;

  @media only screen and (max-width: 465px) {
    justify-content: center;
  }

  h1 {
    text-align: center;
    width: 100%;
  }

  > p {
    text-align: center;
    width: 100%;
  }

  a {
    background: #fbf8f7;
    border-radius: 5px;
    width: 100%;
    display: block;
    text-decoration: none;
    max-width: 191px;

    display: flex;
    flex-direction: column;

    transition: transform 0.2s;

    &:hover {
      transform: translateX(10px);
    }

    & + a {
      margin-top: 16px;
    }

    > span {
      width: 99%;
      height: 151px;

      display: flex;
      place-content: center;
      align-items: center;
      border: 1px solid #312e38;
      border-top-left-radius: 5px;
      border-top-right-radius: 5px;

      background-color: #ffffff;

      margin: 1px;

      > svg {
        color: #312e38;
      }
    }

    img {
      width: 100%;
      height: 100%;
      border-radius: 3px 3px 0 0;
    }

    div {
      padding-top: 16px;
      margin: 0 16px;
      flex: 1;

      strong {
        font-size: 20px;
        color: #3d3d4d;
      }

      p {
        font-size: 16px;
        color: #a8a8b3;
        margin-top: 4px;
      }

      .price {
        color: #ff9000;
        font-size: 12px;
      }
    }

    > button {
      margin-left: auto;
      color: #ffff;
      position: relative;
      bottom: 55px;
      right: 10px;
      border: 2px solid #cbcbd6;
      background: #cbcbd6;
      border-radius: 50%;
      height: 35px;
      -webkit-filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7));
      filter: drop-shadow(3px 3px 2px rgba(0, 0, 0, 0.7));
    }
  }
`;

export const DivMenu = styled.button`
  > ul {
    line-height: 25px;

    > li {
      > a {
        background-color: transparent;
        color: #ffffff;
        transform: none;

        &:hover {
          transform: none;
        }
      }

      > ul li {
        .add-image-button {
          background: #609ede;
          color: #fff;
          width: 145px;

          > svg {
            margin: 0 10px;
          }

          &:hover {
            background: ${shade(0.2, '#609ede')};
          }
        }

        .edit-button {
          background: #cab732;
          color: #fff;
          width: 145px;

          > svg {
            margin: 0 10px;
          }

          &:hover {
            background: ${shade(0.2, '#cab732')};
          }
        }

        .delete-button {
          background: #ad1d1d;
          color: #fff;
          width: 145px;

          > svg {
            margin: 0 10px;
          }

          &:hover {
            background: ${shade(0.2, '#ad1d1d')};
          }
        }

        a {
          display: block;
          width: 100px;
          height: 56px;
          padding-top: 16px;
        }
      }
    }
  }

  li {
    list-style: none;
    position: relative;
  }

  li li {
    list-style: none;
    position: relative;
  }

  ul ul {
    position: absolute;
    visibility: hidden;
  }

  ul li:hover ul {
    visibility: visible;
  }

  a:hover {
    font-weight: bold;
  }
`;

export const Pagination = styled.div`
  width: 100%;
  max-width: 960px;

  display: flex;
  justify-content: center;
  padding-top: 33px;

  button {
    background: transparent;
    border: 0;
    color: #ffffff;
    font-size: 32px;
    transition: transform 0.2s;

    &:hover {
      transform: translateX(10px);
    }
  }

  button + button {
    padding-left: 10px;
  }
`;

export const ContainerButtonAdd = styled.div`
  position: fixed;
  bottom: 10px;
  right: 50px;
`;

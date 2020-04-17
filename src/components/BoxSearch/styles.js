import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 50px;
`;

export const Content = styled.div`
    max-width: 100%;
    width: 933px;
    height: 312px;
`;

export const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;

  ul {
    display: flex;
  }

  a {
    border: 2px solid #f67823;
    border-radius: 4px;
    color: #f67823;
    padding: 10px 30px;
    font-weight: bold;
    margin-bottom: 8px;
  }
`;

export const HeaderItem = styled.li`
    cursor: pointer;
    padding: 0 15px 10px;
    border-bottom: 3px solid
        ${props => (props.active ? '#C80A2E' : '#f5f5f5')};

  button {
    border: 0;
    background: transparent;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  div:first-child {
    padding: 0 10px;

    svg {
        color: ${props => (props.active ? '#C80A2E' : '#999')};
    }
  }

  div.label {
    text-align: left;
  }

  span {
    color: #999;
  }

  span {
    text-transform: uppercase;
  }

  h1 {
    color: ${props => (props.active ? '#C80A2E' : '#999')};
    font-weight: lighter;
    text-transform: uppercase;
  }
`;

export const Card = styled.div`
    box-shadow: 0 0 20px rgba(0, 0, 0, .1);
    background: #fff;
    padding: 15px 30px;

  span {
    color: #C80A2E;
  }

  label {
    color: #444;
  }

  .checkbox-row {
    label {
        margin-right: 15px;
        margin-left: 5px;
    }

    margin-bottom: 20px;
  }

  input#where {
    padding: 0 10px;
  }

  input#where,
  select {
    margin-bottom: 20px;
    height: 38px;
    width: 100%;
    background: transparent;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .bottom-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;

    div {
        width: 40%;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    a {
        font-weight: bold;
    }
  }
`;

export const ClearFilterButton = styled.button`
    background: transparent;
    border: 0;
    color: #444;
`;

export const OfferButton = styled.button`
    height: 50px;
    background: #C80A2E;
    color: #fff;
    width: 70%;
    border: 0;
    border-radius: 4px;
    text-transform: uppercase;
    font-weight: bold;

  &:hover {
    background: ${darken(0.03, '#C80A2E')};
  }
`;

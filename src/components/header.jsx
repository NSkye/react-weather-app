import React, { Component } from 'react';
import styled from 'styled-components';
import MenuButton from './menu-button';

const HeaderStyled = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding-right: 10px;
  padding-left: 10px;

  box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.1);
  z-index: 3;
`;

const HeaderH1 = styled.h1`
  margin: 0;
  padding: 0;
  padding-top: auto;
  padding-bottom: auto;
  height: auto;
  font-style: italic;
  float: left;
`;

class Header extends Component {
  state = {  }
  render() { 
    return (
      <HeaderStyled>
        <HeaderH1>Weather now</HeaderH1>
        <MenuButton />
      </HeaderStyled>
    );
  }
}
 
export default Header;
import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const MenuButtonStyled = styled.div`
  height: 20px;
  width: 20px;
  position: relative;
  float: right;
  cursor: pointer;
  &::before,
  &::after,
  & .menu-button__element {
    content: "";
    position: absolute;
    height: 20%;
    width: 100%;
    background: #000;
    left: 0;
    transition: top 0.1s ease 0.1s, transform 0.1s ease;
  }
  &::before {
    top: 0%;
  }
  & .menu-button__element {
    top: 40%;
  }
  &::after {
    top: 80%;
  }
  ${ props => props.isActive && css`
    &::before,
    &::after,
    & .menu-button__element {
      top: 40%;
      transition: top 0.1s ease, transform 0.1s ease 0.1s;
    }
    &::before,
    &::after {
      transform: rotate(45deg);
    }
    & .menu-button__element {
      transform: rotate(-45deg);
    }
  `}  
`;

class MenuButton extends Component {
  state = { 
    isActive: false
  }

  toggleState = () => {
    this.setState({
      isActive: !this.state.isActive
    });
  }

  render() { 
    return (
      <MenuButtonStyled 
        onClick={this.toggleState} 
        isActive={this.state.isActive}
      >
        < div className="menu-button__element" />
      </MenuButtonStyled>
    );
  }
}
 
export default MenuButton;
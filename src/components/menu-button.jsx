import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { selectSideBarState, selectMapNoErrors } from '../store/reducers';
import { toggleSideBar } from '../store/actions';

const MenuButtonStyled = styled.div`
  display: none;
  ${ props => props.hasMap && css`
    @media(max-width: 928px) {
      display: block;
    }
  `}
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
  ${ props => props.open && css`
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
  
  static propTypes = {
    open: PropTypes.bool.isRequired,
    toggleSideBar: PropTypes.func,
    hasMap: PropTypes.bool
  }

  render() { 
    return (
      <MenuButtonStyled 
        onClick={this.props.toggleSideBar} 
        open={this.props.open}
        hasMap={this.props.hasMap}
      >
        < div className="menu-button__element" />
      </MenuButtonStyled>
    );
  }
}

const mapStateToProps = state => ({
  open: selectSideBarState(state),
  hasMap: selectMapNoErrors(state)
});
const mapDispatchToProps = {
  toggleSideBar
};
 
export default connect(mapStateToProps, mapDispatchToProps)(MenuButton);
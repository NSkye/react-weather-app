import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import Header from './components/header';
import MainBlock from './components/main-block';
import FooterStyled from './components/footer';

import { connect } from 'react-redux';
import { addLocation } from './store/actions';

const AppStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  font-family: Helvetica, Arial, sans-serif;
`;

class App extends Component {
  static propTypes = {
    addLocationItem: PropTypes.func
  }

  componentDidMount() {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(position => {
      this.props.addLocationItem([position.coords.latitude, position.coords.longitude]);
    });
  }

  render() { 
    return (
      <AppStyled>
        <Header></Header>
        <MainBlock></MainBlock>
        <FooterStyled></FooterStyled>
      </AppStyled>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    addLocationItem: coordinates => dispatch(addLocation(coordinates))
  };
};
 
export default connect(null, mapDispatchToProps)(App);
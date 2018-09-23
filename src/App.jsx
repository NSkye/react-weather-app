import React, { Component } from 'react';
import styled from 'styled-components';

import Header from './components/header';
import MainBlock from './components/main-block';
import Footer from './components/footer';

const AppStyled = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  font-family: Helvetica, Arial, sans-serif;
`;

class App extends Component {
  state = {}
  render() { 
    return (
      <AppStyled>
        <Header></Header>
        <MainBlock></MainBlock>
        <Footer></Footer>
      </AppStyled>
    );
  }
}
 
export default App;
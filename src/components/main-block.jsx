import React, { Component } from 'react';
import styled from 'styled-components';

import MapYandex from './map-yandex';
import LocationList from './location-list';

const MainBlockStyled = styled.main`
  position: relative;
  display: flex;
  flex-grow: 1;
  width: 100%;
  overflow: hidden;
`;

class MainBlock extends Component {
  state = {  }
  render() { 
    return (
      <MainBlockStyled>
        <MapYandex></MapYandex>
        <LocationList></LocationList>
      </MainBlockStyled>
    );
  }
}
 
export default MainBlock;
import React, { Component } from 'react';
import styled from 'styled-components';

import LocationData from './location-data';

const LocationListStyled = styled.section`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  width: 50%;
  height: 100%;
  background: white;
  @media(max-width: 720px) {
    transform: translate(100%, 0);
    z-index: 1;
  }
  & > h2 {
    text-align: center;
    margin-top: 10px;
    margin-bottom: 10px;  
  }
  & > ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin: 0;
    padding: 0;
  }
`;

class LocationList extends Component {
  state = {  }
  render() { 
    return (
      <LocationListStyled>
        <h2>Locations</h2>
        <ul>
          <LocationData role='li'></LocationData>
          <LocationData role='li'></LocationData>
          <LocationData role='li'></LocationData>
        </ul>
      </LocationListStyled>
    );
  }
}


 
export default LocationList;
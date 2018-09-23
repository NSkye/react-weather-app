import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LocationDataStyled = styled.div`
  display: flex;
  width: calc(100% - 20px);
  height: 50px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.1);
`;

class LocationData extends Component {

  componentDidMount() {

  }

  static propTypes = {
    children: PropTypes.string
  }

  render() { 
    return (
      <LocationDataStyled>
        { this.props.children || 'loading...' }
      </LocationDataStyled>
    );
  }
}
 
export default LocationData;
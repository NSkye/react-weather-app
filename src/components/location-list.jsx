import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { restoreLocation } from '../store/actions';

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
  overflow-y: scroll;

  @media(max-width: 720px) {
    transform: translate(100%, 0);
    z-index: 1;
  }

  & .location-list {
    &__heading {
      text-align: center;
      margin-top: 10px;
      margin-bottom: 10px;
    }
    &__list {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin: 0;
      padding: 0;
    }
  }
`;

class LocationList extends Component {
  static propTypes = {
    locations: PropTypes.array,
    restoreLocationItem: PropTypes.func
  };

  componentDidMount() {
    if (localStorage && localStorage.getItem('LOCATIONS')) {
      JSON.parse(localStorage.getItem('LOCATIONS')).map(item => this.props.restoreLocationItem(item));
    }
  }

  render() { 
    return (
      <LocationListStyled>
        <h2 className='location-list__heading'>Locations</h2>
        <ul className='location-list__list'>
          { this.props.locations.map(location => <LocationData key={location.key} item={location}></LocationData>) }
        </ul>
      </LocationListStyled>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    restoreLocationItem: locationObj => dispatch(restoreLocation(locationObj))
  };
};

const mapStateToProps = state => {
  const locations = state.locations.list;
  return { locations };
};
 
export default connect(mapStateToProps, mapDispatchToProps)(LocationList);
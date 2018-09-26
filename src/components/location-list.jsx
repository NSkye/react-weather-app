import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';
import { restoreLocation } from '../store/actions';
import { selectLocationList, selectSideBarState, selectMapNoErrors } from '../store/reducers';

import LocationData from './location-data';
import LocationListHeader from './location-list-header';

const LocationListStyled = styled.section`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  width: ${props => props.hasMap ? '50%' : '100%'};
  height: 100%;
  background: white;
  transition: transform 0.2s ease;
  z-index: 2;
  @media (max-width: 927px) {
    width: 100%;
  }
  ${ props => !props.open && css`
    @media (max-width: 927px) {
      transform: translate(100%, 0);
      z-index: 1;
    }
  `}

  & .location-list {
    &__heading {
      margin: 0;
      box-sizing: border-box;
      text-align: center;
      padding-top: 10px;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2)
    }
    &__list {
      display: flex;
      height: 100%;
      flex-direction: column;
      align-items: center;
      width: 100%;
      margin: 0;
      padding: 0;
      overflow-y: scroll;
    }
  }
`;

class LocationList extends Component {
  static propTypes = {
    locations: PropTypes.array,
    restoreLocation: PropTypes.func,
    sideBarState: PropTypes.bool,
    hasMap: PropTypes.bool
  };

  componentDidMount() {
    if (localStorage && localStorage.getItem('LOCATIONS')) {
      JSON.parse(localStorage.getItem('LOCATIONS')).map(item => this.props.restoreLocation(item));
    }
  }

  render() { 
    return (
      <LocationListStyled open={this.props.sideBarState} hasMap={this.props.hasMap}>
        <LocationListHeader />
        <ul className='location-list__list'>
          { this.props.locations.map(location => <LocationData key={location.key} item={location} role='li'></LocationData>) }
        </ul>
      </LocationListStyled>
    );
  }
}

const mapStateToProps = state => ({
  locations: selectLocationList(state),
  sideBarState: selectSideBarState(state),
  hasMap: selectMapNoErrors(state)
});

const mapDispatchToProps = {
  restoreLocation
};
 
export default connect(mapStateToProps, mapDispatchToProps)(LocationList);
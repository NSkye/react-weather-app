import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ymaps from 'ymaps';
import { connect } from 'react-redux';

import { addLocation, toggleSelectLocation, registerMapError } from '../store/actions';
import { selectMapState } from '../store/reducers';

const MapYandexStyled = styled.section`
  position: relative;
  min-height: 100%;
  width: 50%;
  @media (max-width: 928px) {
    width: 100%;
  }
  & .map-container {
    height: 100%;
    width: 100%;
  }
  & .map-blocker {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    ${props => props.selectLocation && 'display: none;'}
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    text-shadow: 0px 0px 5px rgba(255, 255, 255, 1);
    padding-top: 10px;
    min-height: 100%;
    min-width: 100%;
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

class MapYandex extends Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.map = null;
  }

  state = {
    success: true
  }

  static propTypes = {
    coordinates: PropTypes.arrayOf(PropTypes.number),
    zoom: PropTypes.number,
    addLocation: PropTypes.func,
    toggleSelectLocation: PropTypes.func,
    registerMapError: PropTypes.func,
    selectLocation: PropTypes.bool
  }

  async componentDidMount() {
    let maps = null;
    try {
      maps = await ymaps.load('https://api-maps.yandex.ru/2.1/?lang=en_RU');
    } catch (e) {
      this.setState({
        ...this.state,
        success: false
      });
      //eslint-disable-next-line
      console.log('Can not load the map:' + e.message, e);
      this.props.registerMapError();
      return;
    }
    
    this.map = new maps.Map(this.mapRef.current, {
      center: this.props.coordinates,
      zoom: this.props.zoom,
      controls: [],
      type: 'yandex#hybrid'
    });
    this.map.events.add('click', e => {
      const coordinates = e.get('coords');
      this.props.toggleSelectLocation();
      this.props.addLocation(coordinates);
    });
  }

  componentDidUpdate() {
    if (!this.map) return;
    this.map.setCenter(this.props.coordinates, this.props.zoom || null);

    if (this.props.selectLocation) {
      this.map.controls.add('searchControl');
    } else {
      this.map.controls.remove('searchControl');
    }
  }

  render() { 
    return (
      <React.Fragment>
        { this.state.success && 
          <MapYandexStyled selectLocation={this.props.selectLocation}>
            <div 
              onClick={this.props.toggleSelectLocation} 
              className="map-blocker"
            >
              <span className="map-label">Click anywhere on the map to start adding location.</span>
            </div>
            <div className="map-container" ref={this.mapRef} />
          </MapYandexStyled>
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => selectMapState(state);

const mapDispatchToProps = {
  addLocation,
  toggleSelectLocation,
  registerMapError
};
 
export default connect(mapStateToProps, mapDispatchToProps)(MapYandex);
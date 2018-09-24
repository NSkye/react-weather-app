import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { convertIcon } from '../libs/icon-conersion';
import { deleteLocation, focusOnLocation, fetchData, saveData } from '../store/actions';

const LocationDataStyled = styled.div`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  height: 75px;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &:last-child {
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  & .location-data {
    &__heading {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      padding-top: 3px;
      padding-bottom: 3px;
      height: 20px;
      font-size: 14px;
      width: 100%;
      text-align: center;
    }
    &__info {
      display: flex;
      box-sizing: border-box;
      padding-left: 5px;
      padding-right: 10px;
      height: 50px;
      width: 100%;
    }
    &__icon, &__temp {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 50px;
      font-size: 25px;
      font-weight: bold;
    }
    &__icon {
      width: 50px;
    }
    &__summary {
      box-sizing: border-box;
      padding-left: 10px;
      font-size: 14px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      flex-grow: 1;
    }
    &__fetching, &__error {
      display: flex;
      align-items: center;
      padding-left: 5px;
      height: 100%;
    }
    &__error {
      color: red;
    }
    &__close, &__refresh {
      display: flex;
      align-items: center;
      margin-right: 10px;
      cursor: pointer;
      transition: all .2s;
    }
    &__close:hover {
      color: red;
    }
    &__refresh:hover {
      color: blue;
    }
  }
`;

function convertToC(tempK) {
  return (tempK - 273.15).toFixed(0);
}

function isFresh(lastRefresh) {
  return (Date.now() - lastRefresh) < 12 * 3600000;
}

class LocationData extends Component {
  constructor(props) {
    super(props);
    this.deleteRef = React.createRef();
  }

  state = {
    process: 'mounting'
  }

  static propTypes = {
    children: PropTypes.string,
    item: PropTypes.object,
    deleteItem: PropTypes.func,
    focusOnLocation: PropTypes.func,
    fetchWeatherData: PropTypes.func,
    saveWeatherData: PropTypes.func
  }

  componentDidMount() {
    if (this.props.item.info && isFresh(this.props.item.lastRefresh)) {
      this.setState({
        ...this.state,
        process: 'displaying'
      });
      return;
    }

    this.startDataFetching();
  }

  componentDidUpdate() {
    if (this.props.item.info && this.state.process === 'fetching') {
      this.setState({
        ...this.state,
        process: 'displaying'
      });
      clearTimeout(this.timer);
      this.props.saveWeatherData();
    }
  }

  componentWillUnmount() {
    this.props.saveWeatherData();
  }

  startDataFetching() {
    this.setState({
      ...this.state,
      process: 'fetching',
    });
    this.timer = setTimeout(this.startError, 10000);
    this.props.fetchWeatherData(this.props.item.coordinates, this.props.item.key);
  }

  startError = () => {
    this.setState({
      ...this.state,
      process: 'error'
    });
    this.timer = setTimeout(this.props.deleteItem, 2000, this.props.item.key);
  }

  deleteItem = e => {
    e.stopPropagation();
    this.props.deleteItem(this.props.item.key);
  }

  refresh = e => {
    e.stopPropagation();
    this.startDataFetching();
  }

  render() { 
    return (
      <LocationDataStyled onClick={ () => this.props.focusOnLocation(this.props.item.coordinates) }>
        { this.state.process == 'fetching' ? 
          <div className="location-data__fetching">Fetching data...</div> : ''
        }
        { this.state.process == 'displaying' ?
          <React.Fragment>
            <h3 className='location-data__heading'>{this.props.item.info.name}</h3>
            <div className='location-data__info'>
              <span className="location-data__icon"><div className={`wi ${convertIcon(this.props.item.info.icon)}`}></div></span>
              <span className="location-data__temp">{convertToC(this.props.item.info.temp)}°C</span>
              <span className="location-data__summary">
                <span className="location-data__description">Weather: {this.props.item.info.weather}</span>
                <span className="location-data__humidity">Humidity: {this.props.item.info.humidity}%</span>
                <span className="location-data__wind">Wind: {this.props.item.info.wind} m/s</span>
              </span>
              <span onClick={this.refresh} className="location-data__refresh">REFRESH</span>
              <span onClick={this.deleteItem} className="location-data__close">DELETE</span>
            </div>
          </React.Fragment> : ''
        }
        {
          this.state.process == 'error' ?
            <div className="location-data__error" ref={this.deleteRef}>Failed to fetch weather for this location.</div> : ''
        }
      </LocationDataStyled>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    deleteItem: key => dispatch(deleteLocation(key)),
    focusOnLocation: coordinates => dispatch(focusOnLocation(coordinates)),
    fetchWeatherData: (coordinates, key) => dispatch(fetchData(coordinates, key)),
    saveWeatherData: () => dispatch(saveData())
  };
};

export default connect(null, mapDispatchToProps)(LocationData);
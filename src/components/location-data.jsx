import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteLocation, focusOnLocation, fetchData, saveData, abortFetchData } from '../store/actions';

import Icon from './weather-icon';
import TempDisplay from './temp-display';
import WeatherInfo from './weather-info';
import ItemStateDisplay from './item-state-display';

const LocationDataStyled = styled.div.attrs({
  role: props => props.role
})`
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 100%;
  min-height: 75px;
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


function isFresh(lastRefresh) {
  return (Date.now() - lastRefresh) < 12 * 3600000;
}

class LocationData extends Component {
  constructor(props) {
    super(props);
    this.deleteRef = React.createRef();
    this.state = {
      process: (this.props.item.info && isFresh(this.props.item.lastRefresh)) ? 
        'displaying' : 'fetching'
    };
  }

  state = {
    process: 'displaying'
  }

  static propTypes = {
    children: PropTypes.string,
    item: PropTypes.object.isRequired,
    role: PropTypes.string,
    deleteLocation: PropTypes.func.isRequired,
    focusOnLocation: PropTypes.func.isRequired,
    fetchData: PropTypes.func.isRequired,
    saveData: PropTypes.func.isRequired,
    abortFetchData: PropTypes.func.isRequired
  }

  componentDidMount() {
    if (this.props.item.info && isFresh(this.props.item.lastRefresh)) {
      return;
    }

    this.startDataFetching();
  }

  componentDidUpdate() {
    if (this.props.item.info && (this.state.process === 'fetching')) {
      this.setState({
        ...this.state,
        process: 'displaying'
      });
      clearTimeout(this.timer);
      this.props.saveData();
    }
  }

  componentWillUnmount() {
    this.props.abortFetchData(this.props.item.key);
    this.props.saveData();
  }

  startDataFetching(refresh=false) {
  
    this.state.process !== 'fetching' && this.setState({
      process: 'fetching',
    });
    this.timer = setTimeout(this.startError, 10000, refresh);
    this.props.fetchData(this.props.item.coordinates, this.props.item.key);
  }

  startError = (refresh=false) => {
    this.setState({
      process: refresh ? 'displaying' : 'error'
    });
    this.timer = refresh ? null : setTimeout(this.props.deleteLocation, 2000, this.props.item.key);
  }

  deleteLocation = e => {
    e.stopPropagation();
    this.props.deleteLocation(this.props.item.key);
  }

  refresh = e => {
    e.stopPropagation();
    this.startDataFetching(true);
  }

  render() { 
    // eslint-disable-next-line
    console.log(`item ${this.props.item.key} rendered`);
    return (
      <LocationDataStyled 
        role={this.props.role} 
        process={this.state.process} 
        onClick={ () => this.props.item.info && 
          this.props.focusOnLocation(this.props.item.info.coordinates) 
        }
      >
        <ItemStateDisplay state={this.state.process} />
        { this.state.process == 'displaying' &&
          <React.Fragment>
            <h3 className='location-data__heading'>{this.props.item.info.name}</h3>
            <div className='location-data__info'>
              <Icon icon={this.props.item.info.icon} />
              <TempDisplay temp={this.props.item.info.temp} />
              <WeatherInfo weather={this.props.item.info.weather} 
                humidity={this.props.item.info.humidity} 
                wind={this.props.item.info.wind} 
              />
              <i 
                role="button" 
                aria-label="refresh"
                onClick={this.refresh} 
                className="location-data__refresh icon-refresh"
              />
              <i 
                role="button" 
                aria-label="delete"
                onClick={this.deleteLocation} 
                className="location-data__close icon-trash" 
              />
            </div>
          </React.Fragment>
        }
      </LocationDataStyled>
    );
  }
}

const mapDispatchToProps = {
  deleteLocation, focusOnLocation, fetchData, saveData, abortFetchData
};

export default connect(null, mapDispatchToProps)(LocationData);
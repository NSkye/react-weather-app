import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addLocation } from '../store/actions';
import styled from 'styled-components';

const LocationListHeaderStyled = styled.div`
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);

  & .location-list-header {
    &__heading {
      margin: 0;
      box-sizing: border-box;
      text-align: center;
      padding-top: 10px;
      padding-bottom: 5px;
    }
    &__search {
      display: flex;
      font-size: 20px;
      padding-right: 20px;
    }
    &__input {
      flex-grow: 1;
      box-sizing: border-box;
      font-weight: bold;
      border: none;
      padding-left: 20px;
    }
    &__button {
      height: 25px;
      width: 25px;
      cursor: pointer;
      opacity: .5;
      transition: all .2s ease;
      &:hover {
        opacity: 1;
      }
    }
  }
`;

class LocationListHeader extends Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
    this.state = {
      query: ''
    };
  }

  static propTypes = {
    addLocation: PropTypes.func
  }

  handleInputChange = e => this.setState({
    query: e.target.value
  })

  fetchByQuery = () => {
    this.props.addLocation(this.state.query);
    this.inputRef.current.value = '';
  }

  render() { 
    return (
      <LocationListHeaderStyled>
        <h2 className="location-list-header__heading">LOCATIONS</h2>
        <div className="location-list-header__search">
          <input 
            className="location-list-header__input" 
            type="text" 
            placeholder="Add location by query" 
            onChange={this.handleInputChange}
            onKeyPress={ e => e.key == 'Enter' && this.fetchByQuery() }
            ref={this.inputRef}
          />
          <i 
            className="icon-search location-list-header__button" 
            role="button" 
            aria-label="Search" 
            onClick={this.fetchByQuery}
          />
        </div>
      </LocationListHeaderStyled>
    );
  }
}

const mapDispatchToProps = {
  addLocation
};

export default connect(null, mapDispatchToProps)(LocationListHeader);
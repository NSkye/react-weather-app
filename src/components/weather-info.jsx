import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const WeatherInfoStyled = styled.span`
  box-sizing: border-box;
  padding-left: 10px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  flex-grow: 1;
  white-space: nowrap;
  & .wi {
    width: 1.5em;
  }
`;

function capitalizeFirstLetter(text) {
  const firstLetter = text[0].toUpperCase();
  return firstLetter + text.substr(1);
}

const WeatherInfo = props => {
  return (
    <WeatherInfoStyled>
      <span>{capitalizeFirstLetter(props.weather)}.</span>
      <span><i className="wi wi-humidity" /> {props.humidity}%</span>
      <span><i className="wi wi-strong-wind" /> {props.wind} m/s</span>
    </WeatherInfoStyled>
  );
};

WeatherInfo.propTypes = {
  weather: PropTypes.string,
  humidity: PropTypes.number,
  wind: PropTypes.number
};
 
export default WeatherInfo;
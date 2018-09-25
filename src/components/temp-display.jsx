import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const TempDisplayStyled = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 3.3em;
  font-size: 25px;
  font-weight: bold;
`;

const convertToC = tempK => (tempK - 273.15).toFixed(0);
const TempDisplay = props => {
  return (
    <TempDisplayStyled className="location-data__temp">
      {convertToC(props.temp)}°C
    </TempDisplayStyled>
  );
};

TempDisplay.propTypes = {
  temp: PropTypes.number
};
 
export default TempDisplay;
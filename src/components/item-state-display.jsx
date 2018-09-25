import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ItemStateDisplayStyled = styled.div`
  display: ${ props => (props.state!='fetching' && props.state!='error') ? 'none' : 'flex'};
  align-items: center;
  padding-left: 5px;
  height: 100%;
  color: ${ props => props.state == 'error' ? 'red' : 'inherit' };
`;

const ItemStateDisplay = props => {
  return (
    <ItemStateDisplayStyled state={props.state}>
      { props.state == 'fetching' ? 'Fetching weather data.' : 'Unable to fetch weather data.'}
    </ItemStateDisplayStyled>
  );
};

ItemStateDisplay.propTypes = {
  state: PropTypes.string.isRequired
};
 
export default ItemStateDisplay;
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { convertIcon } from '../libs/icon-conersion';

const IconStyled = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  font-size: 25px;
  font-weight: bold;
  width: 50px;
`;

const Icon = props => {
  return (
    <IconStyled>
      <i className={`wi ${convertIcon(props.icon)}`}></i>
    </IconStyled>
  );
};

Icon.propTypes = {
  icon: PropTypes.string
};
 
export default Icon;
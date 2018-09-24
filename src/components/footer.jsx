import React, { Component } from 'react';
import styled from 'styled-components';

const FooterStyled = styled.footer`
  display: flex;
  width: 100%;
  height: 25px;
  background: whitesmoke;
`;

class Footer extends Component {
  state = {  }
  render() { 
    return (
      <FooterStyled>
        <i className="wi wi-day-sunny"></i>
      </FooterStyled>
    );
  }
}
 
export default Footer;
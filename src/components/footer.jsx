import React from 'react';
import styled from 'styled-components';

const FooterStyled = styled.footer`
  box-sizing: border-box;
  width: 100%;
  height: auto;
  background: white;
  text-align: center;
  font-size: 12px;
  color: grey;
  padding: 5px;
  & a {
    color: inherit;
  }
  & .footer__item {
    display: inline-block;
    margin-left: 20px;
    &:first-child {
      margin-left: 0;
    }
  }
`;

const Footer = () => {
  return (
    <FooterStyled>
      <span className="footer__item"><i className="wi wi-alien" /> <a href="https://github.com/NSkye" target="_blank" rel="noopener noreferrer">Nikolai Laevskii</a>, 2018</span>
      <span className="footer__item"><i className="icon-map"/> Map is provided by <a href="https://yandex.ru/maps/" target="_blank" rel="noopener noreferrer">Yandex Maps</a></span>
      <span className="footer__item"><i className="wi wi-cloudy"/> Weather data is provided by <a href="https://openweathermap.org" target="_blank" rel="noopener noreferrer">OpenWeatherMap</a></span>
      <span className="footer__item"><i className="icon-github" /> <a href="https://github.com/NSkye/react-weather-app" target="_blank" rel="noopener noreferrer">View on GitHub</a></span>
    </FooterStyled>
  );
};
 
export default Footer;
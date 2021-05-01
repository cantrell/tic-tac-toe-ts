import React from 'react';
import ReactDOM from 'react-dom';
import Game from './components/Game';
import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font: 14px "Century Gothic", Futura, sans-serif;
    margin: 20px;
  }

  ol, ul {
    padding-left: 30px;
  }
`;

ReactDOM.render(
  <React.StrictMode>
    <>
    <GlobalStyle/>
    <Game/>
    </>
  </React.StrictMode>,
  document.getElementById('root')
);
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style/index.scss';
import { ThemeProvider } from 'styled-components';
import TestGrid from './TestGrid';
import TestTrigger from './TestTrigger';
// eslint-disable-next-line
const theme = require('sass-extract-loader?{"plugins":["sass-extract-js"]}!./style/vars.scss');

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <div className="container pt-1">
      <TestTrigger />
      <div className="mt-2" />
      <TestGrid />
    </div>
  </ThemeProvider>,
  document.getElementById('main'),
);

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style/index.scss';
import TestTrigger from './TestTrigger';

ReactDOM.render(
  <div className="container pt-1">
    <TestTrigger />
  </div>,
  document.getElementById('main'),
);

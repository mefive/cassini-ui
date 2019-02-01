import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style/index.scss';
import TestGrid from './TestGrid';
import TestTrigger from './TestTrigger';

ReactDOM.render(
  <div className="container pt-1">
    <TestTrigger />
    <div className="mt-2" />
    <TestGrid />
  </div>,
  document.getElementById('main'),
);

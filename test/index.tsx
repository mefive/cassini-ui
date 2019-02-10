import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './style/index.scss';
import { ThemeProvider } from 'styled-components';
import TestGrid from './TestGrid';
import TestSelect from './TestSelect';
import TestTrigger from './TestTrigger';
import TestSwitch from './TestSwitch';
import TheForm from './TestForm';
import TestModal from './TestModal';
import TestDialog from './TestDialog';
import TestTooltip from './TestTooltip';
import TestTable from './TestTable/TestTable';
import TestCalendar from './TestCalendar';

// eslint-disable-next-line
const theme = require('sass-extract-loader?{"plugins":["sass-extract-js"]}!./style/vars.scss');

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <div className="container pt-1">
        <TestCalendar />

        <div className="mt-2" />

        <TestTrigger />

        <div className="mt-2" />

        <TestSelect />

        <div className="mt-2" />

        <TestSwitch />

        <div className="mt-2" />

        <TheForm />

        <div className="mt-2" />

        <TestModal />

        <div className="mt-2" />

        <TestDialog />

        <div className="mt-2" />

        <TestTooltip />

        <div className="mt-2" />

        <TestTable />

        <div className="mt-2" />

        <TestGrid />
      </div>
    </React.Fragment>
  </ThemeProvider>,
  document.getElementById('main'),
);

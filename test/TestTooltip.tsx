import * as React from 'react';
import Container from './Container';
import Tooltip from '../src/Tooltip';
import { Placement } from '../src/Popover';

function title(placement: string): string {
  return `Damn, I am in a ${placement} tooltip`;
}

export default () => (
  <Container title="Tooltip">
    <div className="d-flex flex-wrap">
      <Tooltip title={title(Placement.TOP)} placement={Placement.TOP}>
        <div className="btn btn-white">
          Top
        </div>
      </Tooltip>

      <Tooltip title={title(Placement.BOTTOM)} placement={Placement.BOTTOM}>
        <div className="btn btn-primary ml-1">
          Bottom
        </div>
      </Tooltip>

      <Tooltip title={title(Placement.LEFT)} placement={Placement.LEFT}>
        <div className="btn btn-danger ml-1">
          Left
        </div>
      </Tooltip>

      <Tooltip title={title(Placement.RIGHT)} placement={Placement.RIGHT}>
        <div className="btn btn-success ml-1">
          Right
        </div>
      </Tooltip>

      <Tooltip title={title(Placement.TOP_LEFT)} placement={Placement.TOP_LEFT}>
        <div className="btn btn-warning ml-1">
          Top Left
        </div>
      </Tooltip>

      <Tooltip title={title(Placement.TOP_RIGHT)} placement={Placement.TOP_RIGHT}>
        <div className="btn btn-secondary ml-1">
          Top Right
        </div>
      </Tooltip>

      <Tooltip title={title(Placement.BOTTOM_LEFT)} placement={Placement.BOTTOM_LEFT}>
        <div className="btn btn-dark ml-1">
          Bottom Left
        </div>
      </Tooltip>

      <Tooltip title={title(Placement.BOTTOM_RIGHT)} placement={Placement.BOTTOM_RIGHT}>
        <div className="btn btn-light ml-1">
          Bottom Right
        </div>
      </Tooltip>

      <Tooltip title={title(Placement.LEFT_TOP)} placement={Placement.LEFT_TOP}>
        <div className="btn btn-info ml-1">
          Left Top
        </div>
      </Tooltip>

      <Tooltip title={title(Placement.LEFT_BOTTOM)} placement={Placement.LEFT_BOTTOM}>
        <div className="btn btn-link ml-1">
          Left Bottom
        </div>
      </Tooltip>

      <Tooltip title={title(Placement.RIGHT_TOP)} placement={Placement.RIGHT_TOP}>
        <div className="btn btn-white ml-1">
          Right Top
        </div>
      </Tooltip>

      <Tooltip title={title(Placement.RIGHT_BOTTOM)} placement={Placement.RIGHT_BOTTOM}>
        <div className="btn btn-primary ml-1">
          Right Bottom
        </div>
      </Tooltip>
    </div>
  </Container>
);

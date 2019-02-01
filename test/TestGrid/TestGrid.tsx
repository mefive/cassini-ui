import * as React from 'react';
import { range } from 'lodash';

import './style/index.scss';
import Col from '../../src/Grid/Col';
import Grid from '../../src/Grid/Grid';
import Row from '../../src/Grid/Row';
import Container from '../Container';

const GUTTER = 20;

const TestGrid = () => (
  <Container title="Grid">
    <Grid gutter={GUTTER} className="mt-n1">
      <Row gutter={GUTTER}>
        {range(20).map(i => (
          <Col
            key={i}
            className="mt-2"
            gutter={GUTTER}
            xs={{ span: 12 }}
            sm={{ span: 6 }}
            md={{ span: 4 }}
            lg={{ span: 3 }}
            xl={{ span: 2 }}
          >
            <div className="col-item">col</div>
          </Col>
        ))}
      </Row>
    </Grid>
  </Container>
)

export default TestGrid;

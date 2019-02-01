import * as React from 'react';
import { range } from 'lodash';
import styled from 'styled-components';
import { lighten } from 'polished';

import Col from '../src/Grid/Col';
import Grid from '../src/Grid/Grid';
import Row from '../src/Grid/Row';
import Container from './Container';

const GUTTER = 20;

const ColItem = styled.div`
  background-color: ${props => lighten(0.25, props.theme.primary)};
  color: white;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

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
            <ColItem>col</ColItem>
          </Col>
        ))}
      </Row>
    </Grid>
  </Container>
);

export default TestGrid;

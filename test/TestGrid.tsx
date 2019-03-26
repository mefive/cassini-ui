import * as React from 'react';
import range from 'lodash-es/range';
import styled from 'styled-components';
import { darken } from 'polished';

import Grid, { Col, Row } from '../src/Grid';
import Container from './Container';

const GUTTER = 20;

const ColItem = styled.div`
  background-color: ${props => darken(0.25, props.theme.gray300)};
  color: white;
  text-align: center;
  padding-top: 20px;
  padding-bottom: 20px;
`;

const TestGrid = () => (
  <Container title="Grid">
    <Grid gutter={GUTTER} className="mt-n1">
      <Row gutter={GUTTER}>
        {range(10).map(i => (
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

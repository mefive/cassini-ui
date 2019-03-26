import * as React from 'react';
import styled from 'styled-components';

const Central = (props: { children?: JSX.Element | string, className?: string }) => (
  <div className={props.className}>
    <div className="central-container">
      {props.children}
    </div>
  </div>
);

export default styled(Central)`
  display: flex;
  align-items: start;
  justify-content: safe center;
  height: 100%;
  
  .central-container {
    margin: auto;
  }
`;

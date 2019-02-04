import * as React from 'react';
import styled from 'styled-components';
import Select, { SelectProps, StyledPopover } from '../../src/Select';

const Popover = styled(StyledPopover)`
  background: #212529;
`;

export default function (props: SelectProps): JSX.Element {
  return (
    <Select
      {...props}
      popover={(<Popover />)}
    />
  );
}

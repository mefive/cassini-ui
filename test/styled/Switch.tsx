import * as React from 'react';
import styled from 'styled-components';
import Switch, { SwitchProps } from '../../src/Switch';

const StyledSwitch = styled(Switch)`
  background: ${({ theme }) => theme.gray900};
`;

export default function (props: SwitchProps): JSX.Element {
  return (
    <StyledSwitch {...props} />
  );
}

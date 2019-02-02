import styled from 'styled-components';
import { clearFix } from 'polished';
import { ellipsis } from '../utils/styled';

export const StyledSelect = styled.div`
  height: auto !important;
  ${ellipsis()};
`;

export const StyledChoiceContainer = styled.div`
  margin-left: ${props => props.theme.spacers[0]}; 
  margin-top: ${props => props.theme.spacers[0]};
  ${clearFix()};
`;

export const StyledChoice = styled.div`
  float: left;
  border: 1px solid ${props => props.theme.borderColor};
  background-color: #FAFAFA;
  font-size: ${props => props.theme.fontSizeSm};
  padding: 0 ${props => props.theme.spacers[1]};
  border-radius: ${props => props.theme.borderRadiusSm};
  margin-left: ${props => props.theme.spacers[0]};
  margin-top: ${props => props.theme.spacers[0]};
  position: relative;
  
  & > * {
    vertical-align: middle;
  }
  
  svg {
    margin-left: ${props => props.theme.spacers[0]};
  }
`;

export const StyledPopover = styled.div`
  background-color: ${props => props.theme.white};
  border: 1px solid ${props => props.theme.gray300};
  border-radius: ${props => props.theme.borderRadius};
`;

export const StyledOption = styled.div`
  padding: 6px 12px;
  ${ellipsis()};
  position: relative;
  
  cursor: pointer;
  transition-property: color, background-color;
  transition-duration: .1s;
  text-align: left;
  
  color: ${props => props.theme.textMuted};
  
  &:hover {
    background-color: ${props => props.theme.primary};
    color: ${props => props.theme.white};
  }
  
  &.active {
    background-color: #F3F8FF;
    color: ${props => props.theme.primary};
  }
  
  .icon-check {
    position: absolute;
    right: 12px;
    top: 10px;
  }
`;

export const StyledKeyword = styled.div`
  padding: ${props => props.theme.pacers[1]};
`;

import styled from 'styled-components';
import { ellipsis } from 'polished';

export const StyledSelect = styled.div`
  ${ellipsis()};
  display: block;
  
  .choice-wrapper {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-left: -${({ theme }) => theme.spacers[0]};
    margin-top: -${({ theme }) => theme.spacers[0]};
  
    .choice {
      border: 1px solid ${({ theme }) => theme.borderColor};
      background-color: #FAFAFA;
      font-size: ${({ theme }) => theme.fontSizeSm};
      padding: 0 ${({ theme }) => theme.spacers[1]};
      border-radius: ${({ theme }) => theme.borderRadiusSm};
      position: relative;
      
      margin-left: ${({ theme }) => theme.spacers[0]};
      margin-top: ${({ theme }) => theme.spacers[0]};
      
      & > * {
        vertical-align: middle;
      }
      
      svg {
        margin-left: ${({ theme }) => theme.spacers[0]};
      } 
    }  
  }
`;

export const StyledPopover = styled.div`
  background-color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.gray300};
  border-radius: ${({ theme }) => theme.borderRadius};
  max-height: 200px;
  
  .option {
    padding: 6px 12px;
    ${ellipsis()};
    display: block;
    position: relative;
    
    cursor: pointer;
    transition-property: color, background-color;
    transition-duration: .1s;
    text-align: left;
    
    color: ${({ theme }) => theme.textMuted};
    
    &:hover {
      background-color: ${({ theme }) => theme.primary};
      color: ${({ theme }) => theme.white};
    }
    
    &.active {
      background-color: #F3F8FF;
      color: ${({ theme }) => theme.primary};
    }
    
    .icon-check {
      position: absolute;
      right: 12px;
      top: 10px;
    }
  }
  
  .keyword {
    padding: ${({ theme }) => theme.spacers[1]};
  }
`;

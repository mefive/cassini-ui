import * as React from 'react';
import styled from 'styled-components';
import Clickable from '../Clickable';
import Animate, { Animation } from '../Animate';
import SvgCaretDown from '../icons/solid/CaretDown';

export interface TreeNodeProps {
  className?: string;
  key?: string;
  name?: string;
  expanded?: boolean;
  onClick?: (e: React.MouseEvent<any>) => void;
  onExpand?: () => void;
  children?: JSX.Element;
  expandIcon?: JSX.Element;
  node?: JSX.Element;
  isLeaf?: boolean;
}

const StyledTreeNode = styled.li`
  list-style: none;
  padding: 0;
  
  ul {
    padding: 0;
  }
  
  .tree-node {
    display: flex;
    align-items: center;
  }
`;

const ExpandIcon = styled.div`
  svg {
    width: 8px;
    margin-right: 5px;
    fill: currentColor;
    transform: rotate(-90deg);
  }
`;

class TreeNode extends React.PureComponent<TreeNodeProps> {
  static defaultProps = {
    expanded: false,
    expandIcon: (
      <ExpandIcon>
        <SvgCaretDown />
      </ExpandIcon>
    ),
    isLeaf: true,
  };

  render() {
    const { expanded, children } = this.props;

    return (
      <StyledTreeNode className={this.props.className}>
        <Clickable onClick={this.props.onClick}>
          <div className="tree-node">
            {!this.props.isLeaf && React.cloneElement(
              this.props.expandIcon,
              {
                onClick: this.props.onExpand,
              },
            )}

            {this.props.node || (
              <div>
                {this.props.name}
              </div>
            )}
          </div>
        </Clickable>

        {React.Children.count(children) > 0 && (
          <Animate
            enterClassName={Animation.FADE_IN}
            leaveClassName={Animation.FADE_OUT}
          >
            {expanded && (
              <ul>
                {children}
              </ul>
            )}
          </Animate>
        )}
      </StyledTreeNode>
    );
  }
}

export default TreeNode;

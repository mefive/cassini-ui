import * as React from 'react';
import styled from 'styled-components';
import TreeNode, { TreeNodeProps } from './TreeNode';

export type TreeNodeData = {
  id: string | number;
  name: string;
  children?: TreeNodeData[];
};

export interface TreeProps {
  className?: string;
  dataSource?: TreeNodeData[];
  expandedKeys?: string[];
  onExpand?: (expandedKeys: string[]) => void;
  treeNode?: (treeNode: TreeNodeData, key: string) => JSX.Element;
  defaultExpandAll?: boolean;
  treeNodeFilter?: (treeNode: TreeNodeData) => boolean;
}

const StyledTree = styled.ul`
  list-style: none;
  padding: 0;
`;

class Tree extends React.PureComponent<TreeProps> {
  static defaultProps = {
    dataSource: [],
    expandedKeys: [],
    defaultExpandAll: false,
  };

  renderTreeNode(treeNode: TreeNodeData, key: string): JSX.Element {
    if (this.props.treeNodeFilter && !this.props.treeNodeFilter(treeNode)) {
      return null;
    }

    const { expandedKeys } = this.props;
    const expanded = expandedKeys.includes(key);

    let element = (
      <TreeNode />
    );

    if (this.props.treeNode) {
      element = this.props.treeNode(treeNode, key);
    }

    return React.cloneElement(
      element,
      {
        key,
        expanded: this.props.defaultExpandAll || expanded,
        name: treeNode.name,
        isLeaf: treeNode.children == null || treeNode.children.length === 0,
        onExpand: () => {
          const keys = new Set(expandedKeys);

          if (expanded) {
            keys.delete(key);
          } else {
            keys.add(key);
          }

          if (this.props.onExpand) {
            this.props.onExpand(Array.from(keys));
          }
        },
      } as TreeNodeProps,
      treeNode.children
        ? treeNode.children
          .map(child => this.renderTreeNode(child, `${key}-${child.id}`))
        : null,
    );
  }

  render() {
    return (
      <StyledTree className={this.props.className}>
        {this.props.dataSource.map(treeNode => this.renderTreeNode(treeNode, `${treeNode.id}`))}
      </StyledTree>
    );
  }
}

export default Tree;

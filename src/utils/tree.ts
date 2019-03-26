function findTreeNode<T extends { children?: T[] }>(
  treeNodes: T[], key: keyof T, value: any,
): T {
  for (let i = 0; i < treeNodes.length; i += 1) {
    const node = treeNodes[i];

    if (node[key] === value) {
      return node;
    }

    if (node.children && node.children.length > 0) {
      const child = findTreeNode(node.children, key, value);

      if (child) {
        return child;
      }
    }
  }

  return null;
}

function mapTreeNode<T extends { children?: T[] }, P extends { children?: P[] }>(
  treeNodes: T[], mapper: (node: T) => P,
): P[] {
  const ps: P[] = [];

  for (let i = 0; i < treeNodes.length; i += 1) {
    const t = treeNodes[i];

    const p = mapper(t);

    if (t.children && t.children.length > 0) {
      p.children = mapTreeNode(t.children, mapper);
    }

    ps.push(p);
  }

  return ps;
}

export {
  findTreeNode,
  mapTreeNode,
};

import flatten from 'lodash-es/flatten';

export function travel(
  array = [],
  cb: (node, parentNode, level: number) => void = () => {},
  key: string,
  parentNode?,
  level = 1,
) {
  if (!array || !Array.isArray(array)) {
    return;
  }

  array.forEach((node) => {
    cb(node, parentNode, level);

    if (key) {
      travel(node[key], cb, key, node, level + 1);
    }
  });
}

export function flattenWith(
  array = [],
  reducer: (node, parentNode, level: number) => any,
  key: string,
) {
  const f = [];

  travel(
    array,
    (...p) => f.push(reducer(...p)),
    key,
  );

  return f;
}

export function flatMapDeep<T>(array: T[], iteratee: (node: T) => T[]): T[] {
  if (!array || array.length === 0) {
    return [];
  }

  return [
    ...array,
    ...flatMapDeep(flatten(array.map(iteratee)), iteratee),
  ];
}

export function mapTree<T extends { children?: T[] }, P extends { children?: P[] }>(
  collection: T[],
  iteratee: (node: T) => P,
): P[] {
  return collection.map((cNode) => {
    const pNode = iteratee(cNode);

    if (cNode.children == null || cNode.children.length === 0) {
      return pNode;
    }

    return pNode && { ...pNode, children: mapTree(cNode.children, iteratee) };
  });
}

import { RandomNode, randomNode } from './randomNode';

import { randomInt } from './randomInt';

type RandomTree = Record<RandomNode['id'], RandomNode>;

export const randomAgressiveTree = (): RandomTree => {
  const tree = {};
  const root = randomNode();
  root.name = 'root';

  const branchLength = randomInt(1, 5);

  tree[root.id] = root;
  spawnNodes(root, 0);

  function spawnNodes(subtree, depth) {
    if (depth === branchLength) {
      return;
    }
    for (let index = 0; index < randomInt(1, 3); index++) {
      const node = randomNode();
      tree[node.id] = node;
      switch (randomInt(0, 7)) {
        case 0:
        case 1:
        case 2:
          subtree.parents!.push(node.id);
          break;
        case 3:
        case 4:
        case 5:
          subtree.children!.push(node.id);
          break;
        case 6:
          subtree.siblings!.push(node.id);
          break;
        case 7:
          subtree.spouses!.push(node.id);
          break;
      }
      spawnNodes(node, depth + 1);
    }
  }

  return tree;
};

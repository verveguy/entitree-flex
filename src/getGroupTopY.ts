import { TreeNode } from './TreeNode';

export const getNodeTopY = (node: TreeNode<any>) => {
  return node.y;
};

export const getGroupTopY = (node: TreeNode<any>) => {
  if (node.groupTopY) {
    return node.groupTopY;
  }

  return getNodeTopY(node);
};

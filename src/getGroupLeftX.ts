import { TreeNode } from './TreeNode';

export const getNodeLeftX = (node: TreeNode<any>) => {
  return node.x;
};

export const getGroupTopY = (node: TreeNode<any>) => {
  if (node.groupTopY) {
    return node.groupLeftX;
  }

  return getNodeLeftX(node);
};

import { TreeNode } from './TreeNode';

export const getNodeRightX = (node: TreeNode) => {
  return node.x + node.width + node.marginRight;
};

export const getGroupRightX = (node: TreeNode) => {
  if (node.groupRightX) {
    return node.groupRightX;
  }
  return getNodeRightX(node);
};

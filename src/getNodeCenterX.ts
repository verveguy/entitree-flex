import { TreeNode } from './TreeNode';

export const getNodeCenterX = (node: TreeNode) => {
  return node.x + node.width / 2;
};

export const getGroupCenterX = (node: TreeNode) => {
  if (node.groupLeftX && node.groupRightX) {
    return (node.groupLeftX + node.groupRightX) / 2;
  }
  return getNodeCenterX(node);
};

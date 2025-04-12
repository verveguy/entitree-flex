import { TreeNode } from './TreeNode';

export const getNodeCenterY = (node: TreeNode) => {
  return node.y + node.height / 2;
};

export const getGroupCenterY = (node: TreeNode) => {
  if (node.groupTopY && node.groupBottomY) {
    return (node.groupTopY + node.groupBottomY) / 2;
  }
  return getNodeCenterY(node);
};

import { TreeNode } from './TreeNode';

export const getNodeBottomY = (node: TreeNode<any>) => {
  return node.y + node.height + node.marginBottom;
};

export const getGroupBottomY = (node: TreeNode<any>) => {
  if (node.groupBottomY) {
    return node.groupBottomY;
  }

  return getNodeBottomY(node);
};

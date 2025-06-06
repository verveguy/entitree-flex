import { Settings } from './Settings';
import { TreeNode } from './TreeNode';

export const makeRoot = <T>(node: T, settings: Settings): TreeNode<T> => {
  const root = node as TreeNode<T>;
  root.x = settings.rootX;
  root.y = settings.rootY;
  root.groupTopY = root.y;
  root.groupLeftX = root.x;
  root.isRoot = true;

  return root;
};

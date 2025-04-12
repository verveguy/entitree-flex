import { Settings } from './Settings';
import { TreeMap } from './TreeMap';
import { TreeNode } from './TreeNode';
import { addGroupBottomY } from './addGroupBottomY';
import { addGroupLeftX } from './addGroupLeftX';
import { addGroupRightX } from './addGroupRightX';
import { addGroupTopY } from './addGroupTopY';

export function addGroupBoundingBox(subtree: TreeNode, settings: Settings, map: TreeMap) {
  addGroupBottomY(subtree, settings, map);
  addGroupTopY(subtree, settings, map);
  addGroupRightX(subtree, settings, map);
  addGroupLeftX(subtree, settings, map);
}

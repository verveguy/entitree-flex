import { Settings } from './Settings';
import { TreeMap } from './TreeMap';
import { TreeNode } from './TreeNode';
import { getFromMap } from './getFromMap';
import { getGroupTopY } from './getGroupTopY';

export function addGroupTopY(subtree: TreeNode, settings: Settings, map: TreeMap) {
  subtree.groupTopY = subtree.y;

  getFromMap(subtree[settings.nextBeforeAccessor], map)?.forEach((sibling) => {
    if (sibling.y) {
      subtree.groupTopY = Math.min(subtree.groupTopY, getGroupTopY(sibling));
    }
  });

  getFromMap(subtree[settings.nextAfterAccessor], map)?.forEach((partner) => {
    if (partner.y) {
      subtree.groupTopY = Math.min(subtree.groupTopY, getGroupTopY(partner));
    }
  });
}

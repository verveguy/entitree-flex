import { addGroupBoundingBox } from './addGroupBoundingBox';
import { getFromMap } from './getFromMap';
import { Settings } from './Settings';
import { TreeMap } from './TreeMap';
import { TreeNode } from './TreeNode';

export function groupShiftRight(node: TreeNode<any>, settings: Settings, map: TreeMap<any>, currentX: number) {
  const offset = currentX - node.groupLeftX;
  if (offset > 0) {
    // move the whole group to the right
    node.x += offset;
    const siblings = getFromMap(node[settings.nextBeforeAccessor], map);
    siblings?.forEach((sibling) => {
      sibling.x += offset;
    });
    const spouses = getFromMap(node[settings.nextAfterAccessor], map);
    spouses?.forEach((spouse) => {
      spouse.x += offset;
    });

    addGroupBoundingBox(node, settings, map);
  }
}

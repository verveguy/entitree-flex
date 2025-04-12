import { Settings } from './Settings';
import { TreeMap } from './TreeMap';
import { TreeNode } from './TreeNode';

export type GroupCallback = {
  mainNode: TreeNode;
  mainNodeCb: (m: TreeNode) => void;
  beforesCb: (b: TreeNode) => void;
  aftersCb: (a: TreeNode) => void;
  settings: Settings;
  map: TreeMap;
};

export const groupCallback = ({ mainNode, mainNodeCb, beforesCb, aftersCb, settings, map }: GroupCallback) => {
  mainNodeCb(mainNode);

  const befores = mainNode[settings.nextBeforeAccessor];
  if (befores && map[befores]) {
    beforesCb(map[befores]);
  }

  const afters = mainNode[settings.nextAfterAccessor];
  if (afters && map[afters]) {
    aftersCb(map[afters]);
  }
};

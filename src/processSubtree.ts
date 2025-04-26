import { addGroupBoundingBox } from './addGroupBoundingBox';
import { addLevelNodesSizes } from './addLevelNodesSizes';
import { drillChildren } from './drillChildren';
import { drillParents } from './drillParents';
import { drillSiblings } from './drillSiblings';
import { drillSpouses } from './drillSpouses';
import { Settings } from './Settings';
import { TreeMap } from './TreeMap';

export function processRoot<T>(
  root: any,
  settings: Settings,
  map: TreeMap<T>,
  // @ts-ignore - debug is used in commented code
  visualDebug: (root: any, settings: Settings, map: TreeMap<T>) => void = (root, settings, map) => {}
) {
  const contour = [];
  processSubtree(root, settings, map, contour, visualDebug);
}

export function processSubtree<T>(
  root: any,
  settings: Settings,
  map: TreeMap<T>,
  contour?: any[],
  // @ts-ignore - debug is used in commented code
  visualDebug: (root: any, settings: Settings, map: TreeMap<T>) => void = (root, settings, map) => {}
) {
  const callDebugger = () => visualDebug(root, settings, map);

  addLevelNodesSizes([root], settings, map);

  drillSiblings(root, settings, map, contour, () => visualDebug(root, settings, map));
  addGroupBoundingBox(root, settings, map);
  callDebugger();

  drillSpouses(root, settings, map, contour, () => visualDebug(root, settings, map));
  addGroupBoundingBox(root, settings, map);
  callDebugger();

  drillChildren(root, settings, map, contour, () => visualDebug(root, settings, map));

  //addGroupBoundingBox(root, settings, map);

  // callDebugger(root);

  drillParents(root, settings, map, contour, () => visualDebug(root, settings, map));

  addGroupBoundingBox(root, settings, map);
}

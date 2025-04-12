import { addGroupBoundingBox } from './addGroupBoundingBox';
import { addLevelNodesSizes } from './addLevelNodesSizes';
import { clear, drawNodeFrame, drawNodes, higlightNode } from './drawNodes';
import { drillChildren } from './drillChildren';
import { drillParents } from './drillParents';
import { drillSiblings } from './drillSiblings';
import { drillSpouses } from './drillSpouses';
import { Settings } from './Settings';
import { TreeMap } from './TreeMap';
import { TreeNode } from './TreeNode';
import { TreeRel } from './TreeRel';

let getCurrentElems: () => { nodes: TreeNode<any>[]; rels: TreeRel<any>[] };

export function processRoot<T>(
  root: any,
  settings: Settings,
  map: TreeMap<T>,
  getElements?: () => { nodes: TreeNode<T>[]; rels: TreeRel<T>[] }
) {
  getCurrentElems = getElements;

  const contour = [];
  processSubtree(root, settings, map, contour);
}

export function processSubtree<T>(root: any, settings: Settings, map: TreeMap<T>, contour?: any[]) {
  addLevelNodesSizes([root], settings, map);

  drillSiblings(root, settings, map, contour, () => visualDebug(root));
  addGroupBoundingBox(root, settings, map);
  visualDebug(root);

  drillSpouses(root, settings, map, contour, () => visualDebug(root));
  addGroupBoundingBox(root, settings, map);
  visualDebug(root);

  //   addRootSiblingsPositions(root, settings, map, contour);
  //   if (root.isRoot) checkContourOverlap(contour, root, settings);
  //   addRootSpousesPositions(root, settings, map, contour);

  //drillSpouses(root, settings, map, contour, () => visualDebug(root));

  addGroupBoundingBox(root, settings, map);

  visualDebug(root);

  drillChildren(root, settings, map, contour, () => visualDebug(root));

  addGroupBoundingBox(root, settings, map);

  visualDebug(root);

  if (!root.isRoot) {
    //normalizeTree(root, settings.targetsAccessor, settings, map);
    visualDebug(root);
  }

  drillParents(root, settings, map, contour, () => visualDebug(root));

  addGroupBoundingBox(root, settings, map);

  visualDebug(root);
  if (!root.isRoot) {
    //normalizeTree(root, settings.sourcesAccessor, settings, map);
    visualDebug(root);
  }
}

function visualDebug(root) {
  const { nodes, rels } = getCurrentElems();

  clear();
  drawNodeFrame(root);
  higlightNode(root);
  drawNodes(nodes, rels);
}

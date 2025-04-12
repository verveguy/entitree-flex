import { addGroupBoundingBox } from './addGroupBoundingBox';
import { addLevelNodesSizes } from './addLevelNodesSizes';
import { clearDrawing, drawNodeFrame, drawNodes, higlightNode } from './drawNodes';
import { drillChildren } from './drillChildren';
import { drillParents } from './drillParents';
import { drillSiblings } from './drillSiblings';
import { drillSpouses } from './drillSpouses';
import { getElements } from './getElements';
import { Settings } from './Settings';
import { TreeMap } from './TreeMap';
import { TreeNode } from './TreeNode';
import { TreeRel } from './TreeRel';

let getCurrentElems: () => { nodes: TreeNode<any>[]; rels: TreeRel<any>[] };

export function processRoot<T>(root: any, settings: Settings, map: TreeMap<T>) {
  getCurrentElems = () => getElements(root, settings, map);

  const contour = [];
  processSubtree(root, settings, map, contour);
}

export function processSubtree<T>(root: any, settings: Settings, map: TreeMap<T>, contour?: any[]) {
  addLevelNodesSizes([root], settings, map);

  drillSiblings(root, settings, map, contour, () => visualDebug(root));
  addGroupBoundingBox(root, settings, map);
  // visualDebug(root);

  drillSpouses(root, settings, map, contour, () => visualDebug(root));
  addGroupBoundingBox(root, settings, map);
  // visualDebug(root);

  drillChildren(root, settings, map, contour, () => visualDebug(root));

  //addGroupBoundingBox(root, settings, map);

  // visualDebug(root);

  drillParents(root, settings, map, contour, () => visualDebug(root));

  addGroupBoundingBox(root, settings, map);
}

function visualDebug(root) {
  const { nodes, rels } = getCurrentElems();

  clearDrawing();
  drawNodeFrame(root);
  higlightNode(root);
  drawNodes(nodes, rels);
}

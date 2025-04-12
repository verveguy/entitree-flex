import { getElements } from '../src/getElements';
import { layoutFromMap } from '../src/layoutFromMap';
import { clearDrawing, drawNodeFrame, drawNodes, higlightNode } from './drawNodes';
import './style.css';
import { testTree } from './testTree';

// const { nodes, rels } = layoutFromMap(1, randomAgressiveTree(), {
// const { nodes, rels } = layoutFromMap(1, randomTree(), {
const { nodes, rels } = layoutFromMap(
  1,
  testTree,
  {
    rootX: window.innerWidth / 2,
    rootY: window.innerHeight / 2,
    sourceTargetSpacing: 20,
    //orientation: "horizontal",
  },
  visualDebug
);

function visualDebug(root, settings, map) {
  const { nodes, rels } = getElements(root, settings, map);

  clearDrawing();
  drawNodeFrame(root);
  higlightNode(root);
  drawNodes(nodes, rels);
}

// console.log(nodes);

clearDrawing();

drawNodes(nodes, rels);

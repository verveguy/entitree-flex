import { layoutFromMap } from '../src/layoutFromMap';
import flatTree from './flatTree';
import { randomTree } from '../fixtures/randomTree';
import './style.css';
import { drawNodes } from '../src/drawNodes';

// const { nodes, rels } = layoutFromMap(1, randomTree(), {
const { nodes, rels } = layoutFromMap(1, flatTree, {
  rootX: window.innerWidth / 2,
  rootY: window.innerHeight / 2,
  sourceTargetSpacing: 20,
  //orientation: "horizontal",
});

console.log(nodes);

drawNodes(nodes, rels);

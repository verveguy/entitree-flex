import { layoutFromMap } from '../src/layoutFromMap';
import { testTree } from './testTree';
import { randomTree } from '../fixtures/randomTree';
import './style.css';
import { clearDrawing, drawNodes } from '../src/drawNodes';
import { randomAgressiveTree } from '../fixtures/randomAgressive';

// const { nodes, rels } = layoutFromMap(1, randomAgressiveTree(), {
// const { nodes, rels } = layoutFromMap(1, randomTree(), {
const { nodes, rels } = layoutFromMap(1, testTree, {
  rootX: window.innerWidth / 2,
  rootY: window.innerHeight / 2,
  sourceTargetSpacing: 20,
  //orientation: "horizontal",
});

// console.log(nodes);

clearDrawing();

drawNodes(nodes, rels);

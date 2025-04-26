import { SVG } from '@svgdotjs/svg.js';

var draw = SVG().addTo('body');

export function clearDrawing() {
  draw.clear();
}

export function higlightNode(node) {
  draw.rect(node.width, node.height).radius(3).move(node.x, node.y).fill('none').stroke({ width: 2, color: 'red' });
}

export function drawNodes(nodes, rels) {
  rels.forEach((rel) => {
    // if either end x or y is undefined, don't draw
    if (
      rel.source.x === undefined ||
      rel.source.y === undefined ||
      rel.target.x === undefined ||
      rel.target.y === undefined
    )
      return;
    draw.path(getPathD(rel.source, rel.target));
  });
  nodes.forEach((node) => {
    drawNode(node);
  });
}

export function drawNode(node) {
  if (node.x === undefined || node.y === undefined) return;
  draw
    .rect(node.width + (node.marginRight ?? 0), node.height + (node.marginBottom ?? 0))
    .move(node.x, node.y)
    .radius(3)
    .opacity(0.1)
    .fill(stringToColour(node.name ?? ''));

  draw
    .rect(node.width, node.height)
    .radius(3)
    .move(node.x, node.y)
    .fill(stringToColour(node.name ?? ''));

  draw.text(node.name).move(node.x, node.y);
}

export function drawNodeFrame(node) {
  if (node.groupLeftX === undefined || node.groupTopY === undefined) return;
  draw
    .rect(node.groupRightX - node.groupLeftX, node.groupBottomY - node.groupTopY)
    .radius(0)
    .move(node.groupLeftX, node.groupTopY)
    .fill('none')
    .stroke({ width: 1, color: 'white' });
}

function stringToColour(str) {
  str += 'fixed-padding';
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var colour = '#';
  for (var i = 0; i < 3; i++) {
    var value = (hash >> (i * 8)) & 0xff;
    colour += ('00' + value.toString(16)).substr(-2);
  }
  return colour;
}

function getPathD(sourceNode, targetNode) {
  return `M${sourceNode.x + sourceNode.width / 2} ${
    sourceNode.y + sourceNode.height / 2
  } L${targetNode.x + targetNode.width / 2} ${targetNode.y + targetNode.height / 2}`;
}

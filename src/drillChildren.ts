import { addGroupBoundingBox } from './addGroupBoundingBox';
import { addGroupRightX } from './addGroupRightX';
import { addLevelNodesSizes } from './addLevelNodesSizes';
import { checkContourOverlap } from './checkContourOverlap';
import { getFromMap } from './getFromMap';
import { getInitialTargetsShiftLeft } from './getInitialTargetsShiftLeft';
import { getInitialTargetsShiftTop } from './getInitialTargetsShiftTop';
import { getNodeBottomY } from './getNodeBottomY';
import { getNodeRightX } from './getNodeRightX';
import { processSubtree } from './processSubtree';

const descendantsContour = [];

export function drillChildren(
  subtree,
  settings,
  map,
  contour,
  // @ts-ignore - debug is used in commented code
  debug: () => void = () => {}
) {
  if (!contour) contour = descendantsContour;

  const children = getFromMap(subtree[settings.targetsAccessor], map);
  if (!children?.length) return;

  addLevelNodesSizes(children, settings, map);

  // debug();

  if (settings.orientation === 'vertical') {
    const initialShiftLeft = getInitialTargetsShiftLeft(subtree, children, settings, map);
    let currentX = subtree.x - initialShiftLeft;

    children.forEach((child) => {
      const midVerticalY = subtree.groupBottomY + settings.sourceTargetSpacing + child.groupMaxHeight / 2;

      /////////////////// BEFORES ///////////////////
      const siblings = getFromMap(child[settings.nextBeforeAccessor], map);
      siblings?.forEach((sibling) => {
        sibling.x = currentX;
        sibling.y = midVerticalY - sibling.height / 2;

        checkContourOverlap(contour, sibling, settings);
        processSubtree(sibling, settings, map, contour);
        currentX = getNodeRightX(sibling);
      });

      /////////////////// GROUP MAIN NODE

      //Set positions
      child.x = currentX;
      child.y = midVerticalY - child.height / 2;

      checkContourOverlap(contour, child, settings);
      currentX = getNodeRightX(child);

      /////////////////// AFTERS ///////////////////
      getFromMap(child[settings.nextAfterAccessor], map)?.forEach((partner) => {
        partner.x = currentX;
        partner.y = midVerticalY - partner.height / 2;

        processSubtree(partner, settings, map, contour);
        checkContourOverlap(contour, partner, settings);
        currentX = getNodeRightX(partner);
      });

      addGroupBoundingBox(child, settings, map);

      processSubtree(child, settings, map, contour);
    });
  } else {
    // TODO: rework horizontal to match vertical code
    const initialShiftTop = getInitialTargetsShiftTop(subtree, children, settings, map);
    let currentY = subtree.y - initialShiftTop;

    children.forEach((child) => {
      const midPointX = subtree.groupRightX + child.groupMaxWidth / 2;

      /////////////////// SIBLING
      const siblings = getFromMap(child[settings.nextBeforeAccessor], map);
      siblings?.forEach((sibling) => {
        sibling.y = currentY;
        sibling.x = midPointX - sibling.width / 2;

        checkContourOverlap(contour, sibling, settings);

        currentY = getNodeBottomY(sibling);
      });

      /////////////////// CHILD

      //Set positions
      child.y = currentY;
      child.x = midPointX - child.width / 2;

      checkContourOverlap(contour, child, settings);
      currentY = getNodeBottomY(child);

      /////////////////// partners
      const partners = getFromMap(child[settings.nextAfterAccessor], map);
      partners?.forEach((partner) => {
        partner.y = currentY;
        partner.x = midPointX - partner.width / 2;

        checkContourOverlap(contour, partner, settings);
        currentY = getNodeBottomY(partner);
      });

      addGroupRightX(child, settings, map);

      processSubtree(child, settings, map, contour);
    });
  }

  // centerSourceToTargets(subtree, children, settings, map);
}

import { addGroupBoundingBox } from './addGroupBoundingBox';
import { addGroupRightX } from './addGroupRightX';
import { addLevelNodesSizes } from './addLevelNodesSizes';
import { checkContourOverlap } from './checkContourOverlap';
import { getFromMap } from './getFromMap';
import { getInitialTargetsShiftLeft } from './getInitialTargetsShiftLeft';
import { getInitialTargetsShiftTop } from './getInitialTargetsShiftTop';
import { getNodeBottomY } from './getNodeBottomY';
import { processSubtree } from './processSubtree';

const descendantsContour = [];

export function drillSiblings(subtree, settings, map, contour, debug = () => {}) {
  if (!contour) contour = descendantsContour;

  const siblings = getFromMap(subtree[settings.nextBeforeAccessor], map);
  if (!siblings?.length) return;

  addLevelNodesSizes(siblings, settings, map);

  debug();

  if (settings.orientation === 'vertical') {
    const initialShiftLeft = getInitialTargetsShiftLeft(subtree, siblings, settings, map);
    let currentX = subtree.x; // - initialShiftLeft;

    siblings.forEach((sibling) => {
      const midVerticalY = (sibling.y ?? subtree.y) + sibling.groupMaxHeight / 2;
      //Set positions
      sibling.x = currentX - sibling.width - sibling.marginRight;
      sibling.y = midVerticalY - sibling.height / 2;

      processSubtree(sibling, settings, map, contour);
      // groupShiftLeft(sibling, settings, map, currentX);
      //checkContourOverlap(contour, sibling, settings);
      addGroupBoundingBox(sibling, settings, map);
      debug();
      currentX = sibling.groupLeftX;
    });
  } else {
    // TODO: rework horizontal to match vertical code
    const initialShiftTop = getInitialTargetsShiftTop(subtree, siblings, settings, map);
    let currentY = subtree.y - initialShiftTop;

    siblings.forEach((sibling) => {
      const midPointX = subtree.groupRightX + sibling.groupMaxWidth / 2;

      /////////////////// SIBLING
      const siblings = getFromMap(sibling[settings.nextBeforeAccessor], map);
      siblings?.forEach((sibling) => {
        sibling.y = currentY;
        sibling.x = midPointX - sibling.width / 2;

        checkContourOverlap(contour, sibling, settings);

        currentY = getNodeBottomY(sibling);
      });

      /////////////////// CHILD

      //Set positions
      sibling.y = currentY;
      sibling.x = midPointX - sibling.width / 2;

      checkContourOverlap(contour, sibling, settings);
      currentY = getNodeBottomY(sibling);

      /////////////////// partners
      const partners = getFromMap(sibling[settings.nextAfterAccessor], map);
      partners?.forEach((partner) => {
        partner.y = currentY;
        partner.x = midPointX - partner.width / 2;

        checkContourOverlap(contour, partner, settings);
        currentY = getNodeBottomY(partner);
      });

      addGroupRightX(sibling, settings, map);

      processSubtree(sibling, settings, map, contour);
    });
  }

  // centerSourceToTargets(subtree, children, settings, map);
}

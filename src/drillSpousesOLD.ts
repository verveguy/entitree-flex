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

export function drillSpouses(subtree, settings, map, contour, debug = () => {}) {
  if (!contour) contour = descendantsContour;

  const spouses = getFromMap(subtree[settings.nextAfterAccessor], map);
  if (!spouses?.length) return;

  addLevelNodesSizes(spouses, settings, map);

  debug();

  if (settings.orientation === 'vertical') {
    const initialShiftLeft = getInitialTargetsShiftLeft(subtree, spouses, settings, map);
    let currentX = subtree.x - initialShiftLeft;

    spouses.forEach((spouse) => {
      const midVerticalY = (spouse.y ?? subtree.y) + spouse.groupMaxHeight / 2;

      /////////////////// BEFORES ///////////////////
      const siblings = getFromMap(spouse[settings.nextBeforeAccessor], map);
      siblings?.forEach((sibling) => {
        sibling.x = currentX;
        sibling.y = midVerticalY - sibling.height / 2;

        checkContourOverlap(contour, sibling, settings);
        processSubtree(sibling, settings, map, contour);
        currentX = getNodeRightX(sibling);
      });

      /////////////////// GROUP MAIN NODE

      //Set positions
      spouse.x = currentX;
      spouse.y = midVerticalY - spouse.height / 2;

      checkContourOverlap(contour, spouse, settings);
      currentX = getNodeRightX(spouse);

      /////////////////// AFTERS ///////////////////
      getFromMap(spouse[settings.nextAfterAccessor], map)?.forEach((partner) => {
        partner.x = currentX;
        partner.y = midVerticalY - partner.height / 2;

        processSubtree(partner, settings, map, contour);
        checkContourOverlap(contour, partner, settings);
        currentX = getNodeRightX(partner);
      });

      addGroupBoundingBox(spouse, settings, map);

      //checkContourOverlap(descendantsContour, spouse, settings);
      processSubtree(spouse, settings, map, contour);
    });
  } else {
    const initialShiftTop = getInitialTargetsShiftTop(subtree, spouses, settings, map);
    let currentY = subtree.y - initialShiftTop;

    spouses.forEach((spouse) => {
      const midPointX = subtree.groupRightX + spouse.groupMaxWidth / 2;

      /////////////////// SIBLING
      const siblings = getFromMap(spouse[settings.nextBeforeAccessor], map);
      siblings?.forEach((sibling) => {
        sibling.y = currentY;
        sibling.x = midPointX - sibling.width / 2;

        checkContourOverlap(contour, sibling, settings);

        currentY = getNodeBottomY(sibling);
      });

      /////////////////// CHILD

      //Set positions
      spouse.y = currentY;
      spouse.x = midPointX - spouse.width / 2;

      checkContourOverlap(contour, spouse, settings);
      currentY = getNodeBottomY(spouse);

      /////////////////// partners
      const partners = getFromMap(spouse[settings.nextAfterAccessor], map);
      partners?.forEach((partner) => {
        partner.y = currentY;
        partner.x = midPointX - partner.width / 2;

        checkContourOverlap(contour, partner, settings);
        currentY = getNodeBottomY(partner);
      });

      addGroupRightX(spouse, settings, map);

      processSubtree(spouse, settings, map, contour);
    });
  }

  // centerSourceToTargets(subtree, children, settings, map);
}

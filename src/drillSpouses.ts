import { addGroupBoundingBox } from './addGroupBoundingBox';
import { addGroupRightX } from './addGroupRightX';
import { addLevelNodesSizes } from './addLevelNodesSizes';
import { checkContourOverlap } from './checkContourOverlap';
import { getFromMap } from './getFromMap';
import { getInitialTargetsShiftTop } from './getInitialTargetsShiftTop';
import { getNodeBottomY } from './getNodeBottomY';
import { groupShiftRight } from './groupShiftRight';
import { processSubtree } from './processSubtree';

const descendantsContour = [];

export function drillSpouses(
  subtree,
  settings,
  map,
  contour,
  // @ts-ignore - debug is used in commented code
  debug: () => void = () => {}
) {
  if (!contour) contour = descendantsContour;

  const spouses = getFromMap(subtree[settings.nextAfterAccessor], map);
  if (!spouses?.length) return;

  addLevelNodesSizes(spouses, settings, map);

  // debug();

  if (settings.orientation === 'vertical') {
    //const initialShiftLeft = getInitialTargetsShiftLeft(subtree, spouses, settings, map);
    let currentX = subtree.x + subtree.width + subtree.marginRight; // - initialShiftLeft;

    spouses.forEach((spouse) => {
      const midVerticalY = (spouse.y ?? subtree.y) + spouse.groupMaxHeight / 2;
      //Set positions
      spouse.x = currentX;
      spouse.y = midVerticalY - spouse.height / 2;

      processSubtree(spouse, settings, map, contour);
      // adjust position of group in case of siblings to sibling
      groupShiftRight(spouse, settings, map, currentX);
      //checkContourOverlap(contour, sibling, settings);
      addGroupBoundingBox(spouse, settings, map);
      // debug();
      currentX = spouse.groupRightX;
    });
  } else {
    // TODO: rework horizontal to match vertical code
    const initialShiftTop = getInitialTargetsShiftTop(subtree, spouses, settings, map);
    let currentY = subtree.y - initialShiftTop;

    spouses.forEach((spouse) => {
      const midPointX = subtree.groupRightX + spouse.groupMaxWidth / 2;

      /////////////////// SIBLING
      const spouses = getFromMap(spouse[settings.nextBeforeAccessor], map);
      spouses?.forEach((spouse) => {
        spouse.y = currentY;
        spouse.x = midPointX - spouse.width / 2;

        checkContourOverlap(contour, spouse, settings);

        currentY = getNodeBottomY(spouse);
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

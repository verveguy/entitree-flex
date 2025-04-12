import { addGroupBoundingBox } from './addGroupBoundingBox';
import { addGroupLeftX } from './addGroupLeftX';
import { addLevelNodesSizes } from './addLevelNodesSizes';
import { checkContourOverlap } from './checkContourOverlap';
import { getFromMap } from './getFromMap';
import { getInitialTargetsShiftLeft } from './getInitialTargetsShiftLeft';
import { getInitialTargetsShiftTop } from './getInitialTargetsShiftTop';
import { getNodeBottomY } from './getNodeBottomY';
import { getNodeRightX } from './getNodeRightX';
import { processSubtree } from './processSubtree';

const parentsContour = [];

export function drillParents(
  subtree,
  settings,
  map,
  contour,
  // @ts-ignore - debug is used in commented code
  debug: () => void = () => {}
) {
  if (!contour) contour = parentsContour;

  const parents = getFromMap(subtree[settings.sourcesAccessor], map);
  if (!parents?.length) return;

  addLevelNodesSizes(parents, settings, map);

  // debug();

  if (settings.orientation === 'vertical') {
    const initialShiftLeft = getInitialTargetsShiftLeft(subtree, parents, settings, map);
    let currentX = subtree.x - initialShiftLeft;

    parents.forEach((parent) => {
      const midVerticalY = subtree.groupTopY - settings.sourceTargetSpacing - parent.groupMaxHeight / 2;

      /////////////////// BEFORES ///////////////////
      getFromMap(parent[settings.nextBeforeAccessor], map)?.forEach((sibling) => {
        sibling.x = currentX;
        sibling.y = midVerticalY - sibling.height / 2;

        checkContourOverlap(contour, sibling, settings);
        processSubtree(sibling, settings, map, contour);
        currentX = getNodeRightX(sibling);
      });

      /////////////////// GROUP MAIN NODE ///////////////
      //set positions
      parent.x = currentX;
      parent.y = midVerticalY - parent.height / 2;

      //check if touches one of the contours
      checkContourOverlap(contour, parent, settings);
      currentX = getNodeRightX(parent);

      /////////////////// AFTERS ///////////////////
      getFromMap(parent[settings.nextAfterAccessor], map)?.forEach((partner) => {
        partner.x = currentX;
        partner.y = midVerticalY - partner.height / 2;

        processSubtree(partner, settings, map, contour);
        checkContourOverlap(contour, partner, settings);
        currentX = getNodeRightX(partner);
      });

      addGroupBoundingBox(parent, settings, map);

      processSubtree(parent, settings, map, contour);
    });
  } else {
    // TODO: rework horizontal to match vertical code
    const initialShiftTop = getInitialTargetsShiftTop(subtree, parents, settings, map);
    let currentY = subtree.y - initialShiftTop;

    parents.forEach((parent) => {
      const midPointX = subtree.groupLeftX - settings.sourceTargetSpacing - parent.groupMaxWidth / 2;

      /////////////////// SIBLING
      getFromMap(parent[settings.nextBeforeAccessor], map)?.forEach((sibling) => {
        sibling.y = currentY;
        sibling.x = midPointX - sibling.width / 2;

        checkContourOverlap(contour, sibling, settings);

        //update currentY position
        currentY = getNodeBottomY(sibling);
      });

      /////////////////// GROUP MAIN NODE ///////////////
      //Set positions
      parent.y = currentY;
      parent.x = midPointX - parent.width / 2;

      checkContourOverlap(contour, parent, settings);
      //update currentY position
      currentY = getNodeBottomY(parent);

      /////////////////// SPOUSES
      getFromMap(parent[settings.nextAfterAccessor], map)?.forEach((partner) => {
        partner.y = currentY;
        partner.x = midPointX - partner.width / 2;

        checkContourOverlap(contour, partner, settings);
        //update currentY position
        currentY = getNodeBottomY(partner);
      });

      addGroupLeftX(parent, settings, map);

      processSubtree(parent, settings, map, contour);
    });
  }

  // centerSourceToTargets(subtree, parents, settings, map);
}

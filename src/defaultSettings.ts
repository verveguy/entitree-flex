import { Settings } from './Settings';

export const defaultSettings: Settings = {
  clone: false,
  enableFlex: true,
  firstDegreeSpacing: 15,
  nextAfterAccessor: 'spouses',
  nextAfterSpacing: 10,
  nextBeforeAccessor: 'siblings',
  nextBeforeSpacing: 10,
  nodeHeight: 40,
  nodeWidth: 40,
  orientation: 'vertical',
  rootX: 0,
  rootY: 0,
  secondDegreeSpacing: 20,
  sourcesAccessor: 'parents',
  sourceTargetSpacing: 10,
  targetsAccessor: 'children',
};

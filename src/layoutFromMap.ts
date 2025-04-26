import { Settings } from './Settings';
import { TreeMap } from './TreeMap';
import { defaultSettings } from './defaultSettings';
import { getElements } from './getElements';
import { makeRoot } from './makeRoot';
import { processRoot } from './processSubtree';

export function layoutFromMap<T>(
  rootId: string | number,
  originalMap: Record<string | number, T>,
  customSettings: Partial<Settings> = {},
  // @ts-ignore - debug is used in commented code
  visualDebug: (root: any, settings: Settings, map: TreeMap<T>) => void = (root, settings, map) => {}
) {
  const settings: Settings = {
    ...defaultSettings,
    ...customSettings,
  };

  const map: TreeMap<T> = settings.clone ? JSON.parse(JSON.stringify(originalMap)) : originalMap;

  const root = makeRoot(map[rootId], settings);

  processRoot(root, settings, map, visualDebug);

  return getElements<T>(root, settings, map);
}

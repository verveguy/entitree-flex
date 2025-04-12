import { Settings } from "./Settings";
import { TreeMap } from "./TreeMap";
import { defaultSettings } from "./defaultSettings";
import { getElements } from "./getElements";
import { makeRoot } from "./makeRoot";
import { processRoot } from "./processSubtree";

export function layoutFromMap<T>(
  rootId: string | number,
  originalMap: Record<string | number, T>,
  customSettings: Partial<Settings> = {},
) {
  const settings: Settings = {
    ...defaultSettings,
    ...customSettings,
  };

  const map: TreeMap<T> = settings.clone
    ? JSON.parse(JSON.stringify(originalMap))
    : originalMap;

  const root = makeRoot(map[rootId], settings);

  processRoot(root, settings, map, () => getElements(root, settings, map));

  return getElements<T>(root, settings, map);
}

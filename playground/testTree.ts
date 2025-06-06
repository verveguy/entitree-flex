const testTree = {
  '-12': { name: '-12', height: 24, width: 24 },
  '-13': { name: '-13', height: 26, width: 26 },
  '-11': { name: '-11', height: 22, width: 22 },
  '-10': { name: '-10', height: 20, width: 20 },
  '-9': { name: '-9', height: 50, width: 30, parents: [-11] },
  '-8': { name: '-8', height: 35, width: 80 },
  '-7': { name: '-7', height: 14, width: 14 },
  '-6': { name: '-6', siblings: [-8] },
  '-5': { name: '-5', spouses: [-6] },
  '-4': { name: '-4' },
  '-3': {
    name: '-3',
    spouses: [-9, -10],
  },
  '-2': {
    name: '-2',
    parents: [-4, -5],
    children: [-12, -13],
    siblings: [-7],
  },

  1: {
    name: 'root',
    children: [2, 3],
    parents: [-2, -3],
    spouses: [15, 23, 24, 25],
    siblings: [20, 21, 22],
  },

  2: { name: '2', siblings: [8], spouses: [7] },
  3: {
    name: '3',
    children: [4, 5],
    spouses: [6],
    parents: [26, 27, 28],
  },
  4: { name: '4' },
  5: { name: '5', height: 30, width: 20 },
  6: { name: '6', spouses: [16, 17, 18] },
  7: { name: '7', height: 60, width: 60 },
  8: { name: '8', siblings: [9] },
  9: { name: '9', spouses: [] },
  10: { name: '10' },
  11: { name: '11' },
  12: { name: '12' },
  13: { name: '13' },
  14: { name: '14' },
  15: { name: '15' },
  16: { name: '16', height: 30, width: 30 },
  17: { name: '17', parents: [19] },
  18: { name: '18' },
  19: { name: '19' },
  20: { name: '20' },
  21: { name: '21' },
  22: { name: '22' },
  23: { name: '23', height: 80, width: 20 },
  24: { name: '24', height: 100, width: 100 },
  25: { name: '25' },
  26: { name: '26' },
  27: { name: '27' },
  28: { name: '28' },
  29: { name: '29' },
};

export { testTree };

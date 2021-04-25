type IRaw = [string, number?];

const rawPlusList: IRaw[] = [
  ['+', 5],
  ['👍', 5],
  ['👍🏻', 5],
  ['👍🏼', 5],
  ['👍🏽', 5],
  ['👍🏾', 5],
  ['👍🏿', 5],
  ['лайк'],
  ['ня'],
  ['няшно'],
  ['заебись'],
  ['клас'],
  ['класс'],
  ['огонь'],
  ['агонь'],
  ['круто'],
  ['пиздато'],
  ['ахуенно'],
  ['ахуено'],
  ['плюс'],
];

const rawMinusList: IRaw[] = [
  ['-', 5],
  ['👎', 5],
  ['👎🏻', 5],
  ['👎🏼', 5],
  ['👎🏽', 5],
  ['👎🏾', 5],
  ['👎🏿', 5],
  ['дизлайк'],
  ['говно'],
  ['гавно'],
  ['хуйня'],
  ['отстой'],
  ['кринж'],
  ['пиздец'],
  ['хуево'],
  ['хуёво'],
  ['минус'],
];

const parseList = (list: IRaw[]) => list.map(([value, count]) => {
  if (!count) {
    return value;
  }
  let result = '';
  for (let i = 0; i < count; i++) {
    result += value;
  }

  return value;
});

export const plusAndMinusList = [
  '+-',
  '-+',
  '±',
];

export const plusList = parseList(rawPlusList);

export const minusList = parseList(rawMinusList);


export const tokenize = (text: string) => {
  const shortText = text.substring(0, 10);
  return shortText.split(/\s|\.|,|!|\?/).filter((x) => x.length !==0);
}

const plusList = [
  '+',
  '++',
  '+++',
  '++++',
  '+++++',
  '👍',
  '👍👍',
  '👍👍👍',
  '👍👍👍👍',
  '👍👍👍👍👍',
  'лайк',
  'ня',
  'заебись',
  'клас',
  'огонь',
  'круто',
  'пиздато',
  'ахуенно',
  'ахуено',
  'плюс',
];

export const isPlus = (rawText: string) => {
  const text = rawText.toLowerCase();

  if(text.length >10){
    return false;
  }
  
  return plusList.some((x) => text.indexOf(x) === 0);
}


const minusList = [
  '-',
  '--',
  '---',
  '----',
  '-----',
  '👎',
  '👎👎',
  '👎👎👎',
  '👎👎👎👎',
  '👎👎👎👎👎',
  'дизлайк',
  'говно',
  'гавно',
  'хуйня',
  'отстой',
  'кринж',
  'пиздец',
  'хуево',
  'хуёво',
  'минус',
];

export const isMinus = (rawText: string) => {
  const text = rawText.toLowerCase();

  if(text.length >10){
    return false;
  }

  return minusList.some((x) => text.indexOf(x) === 0);
}

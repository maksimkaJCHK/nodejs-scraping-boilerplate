import {
  readJSONFileToAnalitics,
  makeFile,
  makeFolder,
  renameFile,
} from '../services/fs.js';

import { bDate } from '../services/date.js';

const analiticsPath = './results/analitics';
const buildFrazeItem = (length) => length == 1 ? 'новый товар' : 'новых товара';

const analizeShop = async ({
  fraze,
  type = 'cg',
  callback = (f) => f
}) => {
  const preNameFile = type == 'cg' ? 'cg-shop' : 'lb-shop';
  const nameSite = type == 'cg' ? 'читай-город' : 'лабиринт';
  const searchParam = type == 'cg' ? 'id' : 'url';

  const newFile = await readJSONFileToAnalitics(`${preNameFile}-${fraze}`).then((res) => res);
  const oldFile = await readJSONFileToAnalitics(`${preNameFile}-${fraze}-prev`).then((res) => res);

  const newItems = [];

  if (!newFile) {
    console.log('Нет нового файла для анализа');
    callback('Нет нового файла для анализа');

    return;
  }

  if (!oldFile) {
    console.log('Нет старого файла для анализа');
    callback('Нет старого файла для анализа');

    return;
  }

  newFile.forEach((el) => {
    const compareArr = oldFile.filter((item) => el[searchParam] === item[searchParam]);

    if (!compareArr.length) newItems.push(el);
  });

  const nameFile = `${analiticsPath}/${type}-${fraze}.json`;
  const bPrefix = bDate();
  const newNameFile = `${analiticsPath}/${type}-${fraze}_${bPrefix}.json`;

  if (!newItems.length) {
    const frazeRes = `На сайте ${nameSite} по запросу "${fraze}" нет ничего нового.`;

    await renameFile(nameFile, newNameFile);
    console.log(frazeRes);
    callback(frazeRes, 'results');
  }

  if (newItems.length) {
    const frazeRes = `На сайте ${nameSite} по запросу "${fraze}" появилось ${newItems.length} ${buildFrazeItem(newItems.length)}!!!`;

    console.log(frazeRes);
    console.log(newItems);

    callback(frazeRes, 'results');

    await renameFile(nameFile, newNameFile);

    makeFile(nameFile, JSON.stringify(newItems, null, 2));
  }
}

export const runAnalitics = async (callback = (f) => f) => {
  makeFolder(analiticsPath);

  const frazeCg = 'Начался анализ интернет-магазина читай-город.';

  console.log(frazeCg);
  callback(frazeCg);

  await analizeShop({
    fraze: 'javascript',
    callback
  });
  await analizeShop({
    fraze: 'python',
    callback
  });
  await analizeShop({
    fraze: 'typescript',
    callback
  });
  await analizeShop({
    fraze: 'react',
    callback
  });
  await analizeShop({
    fraze: 'angular',
    callback
  });

  const frazeLb = 'Начался анализ интернет-магазина лабиринт.';

  console.log(frazeLb);
  callback(frazeLb);

  await analizeShop({
    fraze: 'javascript',
    type: 'lb',
    callback
  });
  await analizeShop({
    fraze: 'python',
    type: 'lb',
    callback
  });
  await analizeShop({
    fraze: 'typescript',
    type: 'lb',
    callback
  });
  await analizeShop({
    fraze: 'react',
    type: 'lb',
    callback
  });
  await analizeShop({
   fraze: 'angular',
   type: 'lb',
   callback
  });
}
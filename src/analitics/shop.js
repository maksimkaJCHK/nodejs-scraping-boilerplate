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
    await renameFile(nameFile, newNameFile);
    console.log(`На сайте ${nameSite} по запросу ${fraze} нет ничего нового.`);
    callback(`На сайте ${nameSite} по запросу ${fraze} нет ничего нового.`, 'results');
  }

  if (newItems.length) {
    console.log(`На сайте ${nameSite} по запросу ${fraze} появилось ${newItems.length} ${buildFrazeItem(newItems.length)}!!!`);
    console.log(newItems);

    callback(`На сайте ${nameSite} по запросу ${fraze} появилось ${newItems.length} ${buildFrazeItem(newItems.length)}!!!`, 'results');

    await renameFile(nameFile, newNameFile);

    makeFile(nameFile, JSON.stringify(newItems, null, 2));
  }
}

export const runAnalitics = async (callback = (f) => f) => {
  makeFolder(analiticsPath);

  console.log('Начался анализ интернет-магазина читай-город.');
  callback('Начался анализ интернет-магазина читай-город.');

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

  console.log('Начался анализ интернет-магазина лабиринт.');
  callback('Начался анализ интернет-магазина лабиринт.');

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
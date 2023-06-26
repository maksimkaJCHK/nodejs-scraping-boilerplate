const { readJSONFileToAnalitics, makeFile, makeFolder, renameFile, deleteFile } = require('../services/fs');
const { bDate } = require('../services/date');

const analiticsPath = './results/analitics';
const buildFrazeItem = (length) => length == 1 ? 'новый товар' : 'новых товара';

const analizeShop = async (fraze, type = 'cg') => {
  const preNameFile = type == 'cg' ? 'cg-shop' : 'lb-shop';
  const nameSite = type == 'cg' ? 'читай-город' : 'лабиринт';
  const searchParam = type == 'cg' ? 'id' : 'url';

  const newFile = await readJSONFileToAnalitics(`${preNameFile}-${fraze}`).then((res) => res);
  const oldFile = await readJSONFileToAnalitics(`${preNameFile}-${fraze}-prev`).then((res) => res);

  const newItems = [];

  if (!newFile) {
    console.log('Нет нового файла для анализа');

    return;
  }

  if (!oldFile) {
    console.log('Нет старого файла для анализа');

    return;
  }

  newFile.forEach((el) => {
    const compareArr = oldFile.filter((item) => el[searchParam] === item[searchParam]);

    if (!compareArr.length) newItems.push(el);
  });

  const nameFile = `${analiticsPath}/${type}-${fraze}.json`;

  if (!newItems.length) {
    console.log(`На сайте ${nameSite} по запросу ${fraze} нет ничего нового.`);

    try {
      deleteFile(nameFile);
    } catch (error) {
      console.log(`Ранее по запросу ${fraze} на ${nameSite} не было новых товаров.`);
    }
  }

  if (newItems.length) {
    console.log(`На сайте ${nameSite} по запросу ${fraze} появилось ${newItems.length} ${buildFrazeItem(newItems.length)}!!!`);
    console.log(newItems);

    const bPrefix = bDate();

    await renameFile(nameFile, `${analiticsPath}/${type}-${fraze}_${bPrefix}.json`);

    makeFile(nameFile, JSON.stringify(newItems, null, 2));
  }
}

const newItemsAnalitics = async () => {
  makeFolder(analiticsPath);

  console.log('Читай-город:');
  await analizeShop('javascript');
  await analizeShop('python');
  await analizeShop('typescript');
  await analizeShop('react');
  await analizeShop('angular');

  console.log('Лабиринт:');
  await analizeShop('javascript', 'lb');
  await analizeShop('python', 'lb');
  await analizeShop('typescript', 'lb');
  await analizeShop('react', 'lb');
  await analizeShop('angular', 'lb');
}

newItemsAnalitics();
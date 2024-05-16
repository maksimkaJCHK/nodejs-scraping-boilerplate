import {
  renameFileForAnalitics,
  makeFolder,
  makeFile
} from '../../services/fs.js';

export const callbackResults = (nameShop, prefix) => (findFrase, results, callback = (f) => f) => {
  makeFolder('./results/shop-result');

  const path = './results/shop-result/';
  const name = `${prefix}-shop-${findFrase}`;
  const extension = '.json';
  const msg = `Всего найдено - ${results.length} книги по запросу ${findFrase} для интеренет-магазина ${nameShop}`;

  console.log(msg);
  callback(msg);

  renameFileForAnalitics({
    path,
    name,
    extension,
    callback() {
      makeFile(path + name + extension, JSON.stringify(results, null, 2));
    }
  });
};
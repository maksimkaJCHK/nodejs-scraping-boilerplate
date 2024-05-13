import { readJSONFileToAnalitics } from '../../../services/fs.js';

const bCategory = ({ fraze, cgItems, lbItems }) => {
  return {
    id: fraze,
    title: `Поисковый запрос '${fraze}'`,
    idLb: `labirint-${fraze}`,
    idCg: `cg-${fraze}`,
    shops: {
      cg: cgItems,
      lb: lbItems
    },
  };
}

export const bAllShopsParam = async (fraze) => {
  const cgItems = await readJSONFileToAnalitics(`cg-shop-${fraze}`);
  const lbItems = await readJSONFileToAnalitics(`lb-shop-${fraze}`);

  return bCategory({ fraze, cgItems, lbItems });
};
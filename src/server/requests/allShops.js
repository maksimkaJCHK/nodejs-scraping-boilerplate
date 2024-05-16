import { readJSONFileToAnalitics } from '../../services/fs.js';

const allShopsReq = async (req, res, next) => {
  const fraze = req.params.fraze;
  const cgItems = await readJSONFileToAnalitics(`cg-shop-${fraze}`);
  const lbItems = await readJSONFileToAnalitics(`lb-shop-${fraze}`);

  res.render('allShop', {
    title: `Страница по запросу "${fraze}" для интернет магазинов`,
    headerText: `Страница по запросу "${fraze}" для интернет магазинов`,
    fraze,
    type: 'all',
    shops: {
      cgItems,
      lbItems,
    }
  });

  next();
}

export default allShopsReq;
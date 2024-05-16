import { readJSONFileToAnalitics } from '../../services/fs.js';

const lbShopReq = async (req, res, next) => {
  const fraze = req.params.fraze;
  const shop = await readJSONFileToAnalitics(`lb-shop-${fraze}`);

  res.render('currentShop', {
    title: `Запрос ${fraze} для сайта лабиринт`,
    headerText: `Запрос "${fraze}" для сайта лабиринт`,
    fraze,
    type: 'lb',
    nameShop: 'lb',
    shop,
  });

  next();
}

export default lbShopReq;
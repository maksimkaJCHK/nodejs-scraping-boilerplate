import { readJSONFileToAnalitics } from '../../services/fs.js';

const cgShopReq = async (req, res, next) => {
  const fraze = req.params.fraze;
  const shop = await readJSONFileToAnalitics(`cg-shop-${fraze}`);

  res.render('currentShop', {
    title: `Запрос ${fraze} для сайта читай-город`,
    headerText: `Запрос "${fraze}" для сайта читай-город`,
    fraze,
    type: 'cg',
    nameShop: 'cg',
    shop,
  });

  next();
}

export default cgShopReq;
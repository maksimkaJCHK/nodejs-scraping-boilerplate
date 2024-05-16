import { readJSONFileToAnalitics } from '../../services/fs.js';

const newShopReq = async (req, res, next) => {
  const fraze = req.params.fraze;

  const cgItem = await readJSONFileToAnalitics(`cg-${fraze}`, './results/analitics');
  const lbItem = await readJSONFileToAnalitics(`lb-${fraze}`, './results/analitics');

  res.render('newCurrent', {
    title: `Новые товары для фразы ${fraze}`,
    headerText: `Новые товары для фразы ${fraze}`,
    type: 'new',
    fraze,
    shops: {
      cgItem,
      lbItem,
    }
  });

  next();
}

export default newShopReq;
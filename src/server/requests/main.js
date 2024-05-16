import { readJSONFileToAnalitics } from '../../services/fs.js';

const mainReq = async (req, res, next) => {
  const cgJavascript = await readJSONFileToAnalitics('cg-shop-javascript');
  const cgAngular = await readJSONFileToAnalitics('cg-shop-angular');
  const cgPythonr = await readJSONFileToAnalitics('cg-shop-python');
  const cgReact = await readJSONFileToAnalitics('cg-shop-react');
  const cgTypescript= await readJSONFileToAnalitics('cg-shop-typescript');

  const lbJavascript = await readJSONFileToAnalitics('lb-shop-javascript');
  const lbAngular = await readJSONFileToAnalitics('lb-shop-angular');
  const lbPythonr = await readJSONFileToAnalitics('lb-shop-python');
  const lbReact = await readJSONFileToAnalitics('lb-shop-react');
  const lbTypescript= await readJSONFileToAnalitics('lb-shop-typescript');

  res.render('index', {
    title: 'Все запросы',
    headerText: 'Все запросы',
    type: 'all',
    shops: {
      cgJavascript,
      cgAngular,
      cgPythonr,
      cgReact,
      cgTypescript,
      lbJavascript,
      lbAngular,
      lbPythonr,
      lbReact,
      lbTypescript,
    }
  });

  next();
}

export default mainReq;
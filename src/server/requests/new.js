import { readJSONFileToAnalitics } from '../../services/fs.js';

const newReq = async (req, res, next) => {
  const cgJavascript = await readJSONFileToAnalitics('cg-javascript', './results/analitics');
  const cgAngular = await readJSONFileToAnalitics('cg-angular', './results/analitics');
  const cgPythonr = await readJSONFileToAnalitics('cg-python', './results/analitics');
  const cgReact = await readJSONFileToAnalitics('cg-react', './results/analitics');
  const cgTypescript= await readJSONFileToAnalitics('cg-typescript', './results/analitics');

  const lbJavascript = await readJSONFileToAnalitics('lb-javascript', './results/analitics');
  const lbAngular = await readJSONFileToAnalitics('lb-angular', './results/analitics');
  const lbPythonr = await readJSONFileToAnalitics('lb-python', './results/analitics');
  const lbReact = await readJSONFileToAnalitics('lb-react', './results/analitics');
  const lbTypescript= await readJSONFileToAnalitics('lb-typescript', './results/analitics');

  res.render('new', {
    title: 'Новые товары',
    headerText: 'Новые товары',
    type: 'new',
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

export default newReq;
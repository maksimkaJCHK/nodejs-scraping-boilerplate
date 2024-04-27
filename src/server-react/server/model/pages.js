import { readJSONFileToAnalitics } from '../../../services/fs.js';

export const newData = async () => {
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

  const catalogs = [
    {
      id: "javascript",
      title: "Новые товары по запросу 'javascript'",
      idLb: "labirint-javascript",
      idCg: 'cg-javascript',
      shops: {
        cg: cgJavascript || [],
        lb: lbJavascript || []
      },
    },
    {
      id: "react",
      title: "Новые товары по запросу 'react'",
      idLb: "labirint-react",
      idCg: 'cg-react',
      shops: {
        cg: cgReact || [],
        lb: lbReact || []
      },
    },
    {
      id: "python",
      title: "Новые товары по запросу 'python'",
      idLb: "labirint-python",
      idCg: 'cg-python',
      shops: {
        cg: cgPythonr || [],
        lb: lbPythonr || []
      },
    },
    {
      id: "angular",
      title: "Новые товары по запросу 'angular'",
      idLb: "labirint-angular",
      idCg: 'cg-angular',
      shops: {
        cg: cgAngular || [],
        lb: lbAngular || []
      },
    },
    {
      id: "typescript",
      title: "Новые товары по запросу 'typescript'",
      idLb: "labirint-typescript",
      idCg: 'cg-typescript',
      shops: {
        cg: cgTypescript || [],
        lb: lbTypescript || []
      },
    },
  ];
  
  const mainLinks = [
    {
      title: 'Новые товары по запросу javascript',
      url: 'javascript'
    },
    {
      title: 'Новые товары по запросу react',
      url: 'react'
    },
    {
      title: 'Новые товары по запросу python',
      url: 'python'
    },
    {
      title: 'Новые товары по запросу angular',
      url: 'angular'
    },
    {
      title: 'Новые товары по запросу typescript',
      url: 'typescript'
    },
  ];

  return {
    catalogs,
    mainLinks,
  }
}
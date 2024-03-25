const { readJSONFileToAnalitics } = require('../../../services/fs');

const newData = async () => {
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
      title: "Поисковый запрос 'javascript'",
      idLb: "labirint-javascript",
      idCh: 'ch-javascript',
      shops: {
        ch: cgJavascript || [],
        lb: lbJavascript || []
      },
    },
    {
      id: "react",
      title: "Поисковый запрос 'react'",
      idLb: "labirint-react",
      idCh: 'ch-react',
      shops: {
        ch: cgReact || [],
        lb: lbReact || []
      },
    },
    {
      id: "python",
      title: "Поисковый запрос 'python'",
      idLb: "labirint-python",
      idCh: 'ch-python',
      shops: {
        ch: cgPythonr || [],
        lb: lbPythonr || []
      },
    },
    {
      id: "angular",
      title: "Поисковый запрос 'angular'",
      idLb: "labirint-angular",
      idCh: 'ch-angular',
      shops: {
        ch: cgAngular || [],
        lb: lbAngular || []
      },
    },
    {
      id: "typescript",
      title: "Поисковый запрос 'typescript'",
      idLb: "labirint-typescript",
      idCh: 'ch-typescript',
      shops: {
        ch: cgTypescript || [],
        lb: lbTypescript || []
      },
    },
  ];
  
  const mainLinks = [
    {
      title: 'Товары по запросу javascript',
      url: 'javascript'
    },
    {
      title: 'Товары по запросу react',
      url: 'react'
    },
    {
      title: 'Товары по запросу python',
      url: 'python'
    },
    {
      title: 'Товары по запросу angular',
      url: 'angular'
    },
    {
      title: 'Товары по запросу typescript',
      url: 'typescript'
    },
  ];

  return {
    catalogs,
    mainLinks,
  }
}


exports.newData = newData;
import { readJSONFileToAnalitics } from '../../../services/fs.js';

export const mainData = async () => {
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

  const catalogs = [
    {
      id: "javascript",
      title: "Поисковый запрос 'javascript'",
      idLb: "labirint-javascript",
      idCg: 'cg-javascript',
      shops: {
        cg: cgJavascript || [],
        lb: lbJavascript || []
      },
    },
    {
      id: "react",
      title: "Поисковый запрос 'react'",
      idLb: "labirint-react",
      idCg: 'cg-react',
      shops: {
        cg: cgReact || [],
        lb: lbReact || []
      },
    },
    {
      id: "python",
      title: "Поисковый запрос 'python'",
      idLb: "labirint-python",
      idCg: 'cg-python',
      shops: {
        cg: cgPythonr || [],
        lb: lbPythonr || []
      },
    },
    {
      id: "angular",
      title: "Поисковый запрос 'angular'",
      idLb: "labirint-angular",
      idCg: 'cg-angular',
      shops: {
        cg: cgAngular || [],
        lb: lbAngular || []
      },
    },
    {
      id: "typescript",
      title: "Поисковый запрос 'typescript'",
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
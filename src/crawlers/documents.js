import documentsSpider from '../spiders/documentsSpider.js';

import { makeResultsFolder, makeFolder, makeFile } from '../services/fs.js';

const URL = 'https://example-domen.com';
const delay = -1000;

const saveText = ({ path, text }) => {
  const bPath = `./results/documents/${path}`;

  makeFolder(bPath);
  makeFile(bPath + '/info.txt', text);

  return bPath;
}

const documentsCrawler = ({
  pathFolder,
  URL,
  delay,
  saveText
}) => {
  makeResultsFolder();
  makeFolder(pathFolder);

  documentsSpider({
    URL,
    delay,
    saveText
  })
}

documentsCrawler({
  pathFolder: './results/documents',
  URL,
  delay,
  saveText,
})
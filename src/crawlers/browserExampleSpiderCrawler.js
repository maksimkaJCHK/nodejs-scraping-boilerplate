import browserExampleSpider from '../spiders/browserExampleSpider.js';

import { makeResultsFolder, makeFile } from '../services/fs.js';

const domen = 'http://localhost:8080/';

const delayF = (delay = 5000) => {
  return new Promise((resolve, reject) => {
    setInterval(() => resolve(), delay);
  });
};

const savePage = ({ name, body }) => makeFile(`./results/${name}.txt`, body);

const browserExampleCrawler = async ({
  domen,
  makeResultsFolder,
  savePage,
  delayF,
  login,
  password,
}) => {
  await browserExampleSpider({
    domen,
    makeResultsFolder,
    savePage,
    delayF,
    login,
    password,
  });
}

browserExampleCrawler({
  domen,
  makeResultsFolder,
  delayF,
  savePage,
  login: 'login',
  password: 'password'
});
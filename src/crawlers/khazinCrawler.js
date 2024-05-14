import khazinSpider from '../spiders/khazinSpider.js';
import log from 'cllc';

import { makeFile, makeResultsFolder, makeFolder } from '../services/fs.js';

const URL = 'https://khazin.ru/articles/page/360/';

const bNamePage = (url) => {
  const bUrl = url.replace('https://khazin.ru/', '');

  return `${bUrl
    .replace(/\\/gi, '')
    .replace(/\//gi, '')}`;
}

const saveArticle = ({
  page,
  count,
  url,
  content
}) => {
  makeFile(`./results/hazin_results/${page}_${count}_${bNamePage(url)}`, content);
};

const resultsCallback = (results) => {
  console.log('__________________');
  log().info('Парсинг закончился');

  makeFile('./results/data.json', JSON.stringify(results, null, 2));
};

const khazinCrawler = ({
  URL,
  saveArticle,
  resultsCallback,
  delay = -1000
}) => {
  makeResultsFolder();
  makeFolder('./results/hazin_results');

  khazinSpider({
    URL,
    saveArticle,
    resultsCallback,
    delay,
  })
}

khazinCrawler({
  URL,
  saveArticle,
  resultsCallback,
});
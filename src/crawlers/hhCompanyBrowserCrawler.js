import hhCompanyBrowserSpider from '../spiders/hhCompanyBrowserSpider.js';
import log from 'cllc';

import { makeFile, makeResultsFolder, makeFolder } from '../services/fs.js';

const bNumb = (numb) => numb < 10 ? '0' + numb : numb;

const bDate = () => {
  const cDate = new Date();

  const date = bNumb(cDate.getDate());
  const month = bNumb(cDate.getMonth() + 1);
  const year = cDate.getFullYear();
  const hours = bNumb(cDate.getHours());
  const minutes = bNumb(cDate.getMinutes());

  return `${date}-${month}-${year}_${hours}-${minutes}`;
};

const vacancyCallback = (vacancyFolder) => (data) => {
  if (Object.keys(data).length) {
    const { name, price, description } = data;

    const content = `<h1>${name}</h1>
                     <div class="price">${price}</div>
                     ${description}
    `
    log().info(`Вакансия - "${name}"`);

    makeFile(`${vacancyFolder}${name.replace(/\//gi, ' ')}.html`, content);
  }
};

const resultsCallback = (results) => {
  console.log('__________________________________________________');
  console.log('');
  log().info(`Всего найдено ${results.length} вакансий`);

  if (results.length) {
    const progr = results.filter(({ name }) => name.toLowerCase().indexOf('программист') !== -1);
    const front = results.filter(({ name }) => name.toLowerCase().indexOf('front') !== -1);
    const verst = results.filter(({ name }) => name.toLowerCase().indexOf('верстальщик') !== -1);
    const web = results.filter(({ name }) => name.toLowerCase().indexOf('web') !== -1);

    if (progr.length) log().info(`По вакансии программист найдено ${progr.length} вакансии.`);
    if (front.length) log().info(`По вакансии frontend-разоаботчик найдена ${progr.length} вакансия.`);
    if (verst.length) log().info(`По вакансии верстальщик найдена ${progr.length} вакансия.`);
    if (web.length) log().info(`По вакансии web-мастер найдена ${progr.length} вакансия.`);
  }
};

const hhCompanyBrowserCrawler = async ({
  idCompany,
  nameCompany,
}) => {
  const date = bDate();
  const hhFolder = './results/hh';
  const vacancyFolder = `${hhFolder}/${nameCompany}/${nameCompany}-${date}/`;
  const screenShotFolder = `${vacancyFolder}/screenshot/`;

  makeResultsFolder();
  makeFolder(hhFolder);
  makeFolder(`${hhFolder}/${nameCompany}`);
  makeFolder(vacancyFolder);
  makeFolder(screenShotFolder);

  const vacancyCallbackFun = vacancyCallback(vacancyFolder);

  await hhCompanyBrowserSpider({
    idCompany,
    vacancyCallback: vacancyCallbackFun,
    resultsCallback,
    screenPath: screenShotFolder
  })
}

const runCompanyCrawlers = async () => {
  await hhCompanyBrowserCrawler({
    idCompany: '909573',
    nameCompany: 'express-office',
  });

  await hhCompanyBrowserCrawler({
    idCompany: '4127247',
    nameCompany: 'Qtim',
  });

  await hhCompanyBrowserCrawler({
    idCompany: '200522',
    nameCompany: 'soft-expert',
  });
}

runCompanyCrawlers();
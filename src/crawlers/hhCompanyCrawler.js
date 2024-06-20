import hhCompanySpider from '../spiders/hhCompanySpider.js';
import log from 'cllc';

import { makeFile, makeResultsFolder, makeFolder } from '../services/fs.js';

const bNumb = (numb) => numb < 10 ? '0' + numb : numb;

const bDate = () => {
  const cDate = new Date();

  const date = bNumb(cDate.getDate());
  const month = bNumb(cDate.getMonth());
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

    makeFile(`${vacancyFolder}${name}.html`, content);
  }
};

const resultsCallback = (results) => {
  console.log('__________________________________________________');
  console.log('');
  log().info(`Всего найдено ${results.length} вакансий`);

  if (results.length) {
    const progr = results.filter(({ name }) => name.toLowerCase().indexOf('программист') !== -1);
    const front = results.filter(({ name }) => name.toLowerCase().indexOf('front') !== -1);

    if (progr.length) log().info(`По вакансии программист найдено ${progr.length} вакансии.`);
    if (front.length) log().info(`По вакансии frontend-разоаботчик найдено ${progr.length} вакансии.`);
  }
};

const hhCompanyCrawler = ({
  idCompany,
  nameCompany,
  delay = -1000
}) => {
  const date = bDate();
  const hhFolder = './results/hh';
  const vacancyFolder = `${hhFolder}/${nameCompany}/${nameCompany}-${date}/`;

  makeResultsFolder();
  makeFolder(hhFolder);
  makeFolder(`${hhFolder}/${nameCompany}`);
  makeFolder(vacancyFolder);

  const vacancyCallbackFun = vacancyCallback(vacancyFolder);

  hhCompanySpider({
    idCompany,
    vacancyCallback: vacancyCallbackFun,
    resultsCallback,
    delay,
  })
}

hhCompanyCrawler({
  idCompany: '909573',
  nameCompany: 'express-office',
});
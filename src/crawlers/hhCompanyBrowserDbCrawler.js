import { db, Vacancies } from '../db/hh.js';

import hhCompanyBrowserSpider from '../spiders/hhCompanyBrowserSpider.js';
import log from 'cllc';

const vacancyCallback = (id, nameCompany) => async (data) => {
  if (Object.keys(data).length) {
    const { name, price, description } = data;

    log().info(`Вакансия - "${name}"`);

    await Vacancies.create({
      id,
      nameCompany,
      name,
      price,
      description
    });
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
  const vacancyCallbackFun = vacancyCallback(Date.now(), nameCompany);

  await hhCompanyBrowserSpider({
    idCompany,
    vacancyCallback: vacancyCallbackFun,
    resultsCallback,
  });
}

const runCompanyCrawlers = async () => {
  await db.authenticate();
 
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

  await db.close();
}

runCompanyCrawlers();
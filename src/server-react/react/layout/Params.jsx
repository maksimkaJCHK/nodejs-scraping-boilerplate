import React from 'react';
import { useDispatch } from 'react-redux';

import Link from '../components/ui/Link';
import Button from '../components/ui/Button';

import { setIsReloadCatalogBtn } from '@slices/catalogs';
import { setIsReloadNewCatalogBtn } from '@slices/new-catalogs';

import './_params.scss';

const Params = ({ cg, lb, newItem, children }) => {
  const dispatch = useDispatch();

  const typeSocket = ({ type }) => {
    const socket = new WebSocket(`ws://localhost:8080/${type}`);

    socket.addEventListener("open", (event) => {
      socket.send("Соединение с сервером установлено!");
    });

    socket.addEventListener("message", (event) => {
      console.log("Сообщение от сервера: ", event.data);

      const mes = JSON.parse(event.data);

      if (mes.type === 'end') {
        socket.close();

        if (type === 'scraping') {
          dispatch(setIsReloadCatalogBtn());
        }

        if (type === 'analitics') {
          dispatch(setIsReloadNewCatalogBtn());
        }

        if (type === 'scraping-and-analitics') {
          dispatch(setIsReloadCatalogBtn());
          dispatch(setIsReloadNewCatalogBtn());
        }
      }
    });

    socket.addEventListener("close", (event) => {
      console.log("Соединение с сервером закрыто!");
    });
  };

  const analitics = () => typeSocket({ type: 'analitics' });
  const scraping = () => typeSocket({ type: 'scraping' });
  const scrapingAndAnalitics = () => typeSocket({ type: 'scraping-and-analitics' });

  return (
    <section className="params">
      <div className="h2">Запросы по конкретным магазинам:</div>

      <div className="params-nav">
        <b>Запрос для читай-города: </b>
        {
          cg.map((link, idx) => {
            return <Link
              { ...link }
              key = { idx }
            />
          })
        }
      </div>
      <div className="params-nav">
        <b>Запрос для лабирита: </b>
        {
          lb.map((link, idx) => {
            return <Link
              { ...link }
              key = { idx }
            />
          })
        }
      </div>
      <div className="params-nav">
        <h2>Новые товары:</h2>
        <b>
          <Link
            url="/new"
            title="Новые товары по всем запросам"
          />
        </b>
        {
          newItem.map((link, idx) => {
            return <Link
              { ...link }
              key = { idx }
            />
          })
        }
      </div>

      <Button onClick = { scraping }>
        Скрапинг интернет-магазинов
      </Button>
      <Button onClick = { analitics }>
        Анализировать
      </Button>
      <Button onClick = { scrapingAndAnalitics }>
        Скрапинг интернет-магазинов и анализ
      </Button>

      { children }
    </section>
  )
}

export default Params;
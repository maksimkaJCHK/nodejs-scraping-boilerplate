import React from 'react';

import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import { setIsReloadCatalog, setIsReloadCatalogBtn } from '@slices/catalogs';
import { setIsReloadNewCatalog, setIsReloadNewCatalogBtn } from '@slices/new-catalogs';

import { topNav, navParams } from '../model/nav';

import Nav from '../layout/Nav';
import Params from '../layout/Params';
import Button from '../components/ui/Button';

const Root = () => {
  const { isReloadCatalogBtn } = useSelector(state => state.catalogs);
  const { isReloadNewCatalogBtn } = useSelector(state => state.newCatalogs);

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
    <>
      <Nav link = { topNav } />

      <Params
        { ...navParams }
        analitics = { analitics }
        scraping = { scraping }
        scrapingAndAnalitics = { scrapingAndAnalitics }
      >
        { isReloadCatalogBtn
          ? <Button onClick = { () => dispatch(setIsReloadCatalog())}>
              Обновить товары
            </Button>
          : null
        }
        {
          isReloadNewCatalogBtn
            ? <Button onClick = { () => dispatch(setIsReloadNewCatalog())}>
                Обновить новые товары
              </Button>
            : null
        }
      </Params>

      <main>
        <Outlet />
      </main>
    </>
  )
}

export default Root;
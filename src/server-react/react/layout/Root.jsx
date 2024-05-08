import React from 'react';

import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';

import {
  setIsReloadCatalog,
  setIsReloadCatalogBtn,
  runScraping,
  stopScraping,
} from '@slices/catalogs';

import {
  setIsReloadNewCatalog,
  setIsReloadNewCatalogBtn,
  runAnalitics,
  stopAnalitics,

} from '@slices/new-catalogs';

import { addInJournal, openJournal } from '@slices/journal';

import { topNav, navParams } from '../model/nav';

import Journal from './journal/Journal';
import Nav from '../layout/Nav';
import Params from '../layout/Params';
import Button from '../components/ui/Button';

const Root = () => {
  const { isReloadCatalogBtn, isScraping } = useSelector(state => state.catalogs);
  const { isReloadNewCatalogBtn, isAnalitics } = useSelector(state => state.newCatalogs);

  const dispatch = useDispatch();

  const typeSocket = ({ type }) => {
    const socket = new WebSocket(`ws://localhost:8080/${type}`);

    socket.addEventListener("open", (event) => {
      dispatch(openJournal());
      socket.send("Соединение с сервером установлено!");
    });

    socket.addEventListener("message", (event) => {
      const mes = JSON.parse(event.data);

      dispatch(addInJournal(mes));

      if (mes.type === 'end') {
        socket.close();

        if (type === 'scraping') {
          dispatch(setIsReloadCatalogBtn());
          dispatch(stopScraping());
        }

        if (type === 'analitics') {
          dispatch(setIsReloadNewCatalogBtn());
          dispatch(stopAnalitics());
        }

        if (type === 'scraping-and-analitics') {
          dispatch(setIsReloadCatalogBtn());
          dispatch(setIsReloadNewCatalogBtn());

          dispatch(stopScraping());
          dispatch(stopAnalitics());
        }
      }
    });

    socket.addEventListener("close", (event) => {
      console.log("Соединение с сервером закрыто!");
    });
  };

  const analitics = () => {
    if (!isAnalitics) {
      dispatch(runAnalitics());
      typeSocket({ type: 'analitics' });
    }
    
  };
  const scraping = () => {
    if (!isScraping) {
      dispatch(runScraping());
      typeSocket({ type: 'scraping' });
    }
    
  };
  const scrapingAndAnalitics = () => {
    if (!isScraping || !isAnalitics) {
      dispatch(runAnalitics());
      dispatch(runScraping());

      typeSocket({ type: 'scraping-and-analitics' });
    }
  };

  return (
    <>
      <Nav link = { topNav } />

      <Params
        { ...navParams }
        analitics = { analitics }
        scraping = { scraping }
        scrapingAndAnalitics = { scrapingAndAnalitics }
        isScraping = { isScraping }
        isAnalitics = { isAnalitics }
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

      <Journal />
    </>
  )
}

export default Root;
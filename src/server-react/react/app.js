import React, { useEffect } from 'react';
import ReactDOM, { hydrateRoot } from 'react-dom/client';

import { RouterProvider } from "react-router-dom";

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import router from  './router/router';

import catalogs from '@slices/catalogs';
import newCatalogs from '@slices/new-catalogs';
import journal from '@slices/journal';
import searchResults from '@slices/search-results';

import '@styles/main.scss';

const node = document.getElementById('app');

const store = configureStore({
  reducer: {
    catalogs,
    newCatalogs,
    journal,
    searchResults
  },
});

const App = () => {
  useEffect(() => {
    const app = document.querySelector('body');
    app.classList.add('isVisible');
  }, []);

  return (
    <Provider store = { store } >
      <RouterProvider router = { router } />
    </Provider>
  )
}

hydrateRoot(node, <App />);
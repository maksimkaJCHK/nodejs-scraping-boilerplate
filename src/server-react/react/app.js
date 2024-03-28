import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider } from "react-router-dom";

import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import router from  './router/router';

import catalogs from '@slices/catalogs';
import newCatalogs from '@slices/new-catalogs';

import '@styles/main.scss';

const node = document.getElementById('app');
const root = ReactDOM.createRoot(node);

const store = configureStore({
  reducer: {
    catalogs,
    newCatalogs,
  },
});

const App = () => {
  useEffect(() => {
    const renderCont = document.getElementById('forRenderContent');

    if (renderCont) {
      renderCont.parentNode.removeChild(renderCont);
    }

    const app = document.querySelector('body');
    app.classList.add('isVisible');
  }, []);

  return (
    <Provider store = { store } >
      <RouterProvider router = { router } />
    </Provider>
  )
}

root.render(<App />);
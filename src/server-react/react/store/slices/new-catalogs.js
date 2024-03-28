import { createSlice } from '@reduxjs/toolkit';

import { loadCatalog, loadCurCategory } from '@thunk/new-catalogs';

const initialState = {
  error: false,
  load: true,
  timeLoad: null,
  mainLinks: [],
  catalogs: [],
};

const newCatalogs = createSlice({
  name: 'new-catalogs',
  initialState,
  reducers: {
    addCatalogs(state, { payload }) {
      state.load = false;
      state.catalogs = payload;
    },
    addMainLinks(state, { payload }) {
      state.mainLinks = payload;
    },
    // Запросы по конкретным ключевым словам для читай-города и лабиринта
    addCategoryInCatalogs(state, { payload }) {
      if (payload) {
        state.timeLoad = Date.now();
        state.load = false;
        state.catalogs.push(payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Главная страниц
      .addCase(loadCatalog.pending, (state) => {
        state.load = true;
        state.error = false;
      })
      .addCase(loadCatalog.fulfilled, (state, action) => {
        state.load = false;
        state.error = false;

        const { mainLinks, catalogs } = action.payload;

        state.mainLinks = mainLinks;
        state.catalogs = catalogs;
      })
      .addCase(loadCatalog.rejected, (state) => {
        state.load = false;
        state.error = true;
      })
      // Конкретная фраза для лабиринта и читай-города
      .addCase(loadCurCategory.pending, (state) => {
        state.load = true;
        state.error = false;
      })
      .addCase(loadCurCategory.fulfilled, (state, action) => {
        if (action.payload) {
          state.timeLoad = Date.now();
          state.load = false;
          state.error = false;
          state.timeLoad = Date.now();

          const { id } = action.payload;

          const idx = state.catalogs.findIndex((el) => el.id === id);

          if (idx === -1) {
            state.catalogs.push(action.payload);
          }

          if (idx !== -1) {
            state.catalogs[idx] = action.payload;
          }
        }
      })
      .addCase(loadCurCategory.rejected, (state) => {
        state.load = false;
        state.error = true;
      })
  }
})

const {
  addCatalogs,
  addMainLinks,
  addCategoryInCatalogs,
  addShopInCatalogs
} = newCatalogs.actions;

export {
  addCatalogs,
  addMainLinks,
  addCategoryInCatalogs,
  addShopInCatalogs,
  loadCatalog,
  loadCurCategory,
}

export default newCatalogs.reducer;
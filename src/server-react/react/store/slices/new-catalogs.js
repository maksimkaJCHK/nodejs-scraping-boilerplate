import { createSlice } from '@reduxjs/toolkit';

import { loadCatalog, loadCurCategory } from '@thunk/new-catalogs';

const bCategorory = (state) => {
  if (window.newCategory) {
    return {
      ...state,
      load: false,
      catalogs: [
        window.newCategory
      ]
    }
  }

  return state;
};

let initialState = {
  isAnalitics: false,
  error: false,
  load: true,
  isReloadNewCatalogBtn: false,
  isReloadNewCatalog: false,
  timeLoad: null,
  mainLinks: window.newMainLinks || [],
  catalogs: window.newCatalogs || [],
};

initialState = bCategorory(initialState);

const newCatalogs = createSlice({
  name: 'new-catalogs',
  initialState,
  reducers: {
    runAnalitics(state) {
      state.isAnalitics = true;
    },
    stopAnalitics(state) {
      state.isAnalitics = false;
    },
    addCatalogs(state, { payload }) {
      state.load = false;
      state.catalogs = payload;
    },
    addMainLinks(state, { payload }) {
      state.mainLinks = payload;
    },
    stopLoad(state) {
      state.load = false;
    },
    // Запросы по конкретным ключевым словам для читай-города и лабиринта
    addCategoryInCatalogs(state, { payload }) {
      if (payload) {
        state.timeLoad = Date.now();
        state.load = false;
        state.catalogs.push(payload);
      }
    },
    // Для отображение кнопки обновить новый каталог
    setIsReloadNewCatalogBtn(state) {
      state.isReloadNewCatalogBtn = true;
    },
    setIsReloadNewCatalog(state) {
      state.isReloadNewCatalog = true;
      state.isReloadNewCatalogBtn = false;
      state.catalogs = [];
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

        state.isReloadNewCatalogBtn = false;
        state.isReloadNewCatalog = false;
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

          state.isReloadNewCatalogBtn = false;
          state.isReloadNewCatalog = false;
        }
      })
      .addCase(loadCurCategory.rejected, (state) => {
        state.load = false;
        state.error = true;
      })
  }
})

const {
  stopLoad,
  addCatalogs,
  addMainLinks,
  addCategoryInCatalogs,
  addShopInCatalogs,
  setIsReloadNewCatalogBtn,
  setIsReloadNewCatalog,
  runAnalitics,
  stopAnalitics,
} = newCatalogs.actions;

export {
  stopLoad,
  addCatalogs,
  addMainLinks,
  addCategoryInCatalogs,
  addShopInCatalogs,
  loadCatalog,
  loadCurCategory,
  setIsReloadNewCatalogBtn,
  setIsReloadNewCatalog,
  runAnalitics,
  stopAnalitics,
}

export default newCatalogs.reducer;
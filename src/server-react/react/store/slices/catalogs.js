import { createSlice } from '@reduxjs/toolkit';

import { loadCatalog, loadCurCategory, loadCurShop } from '@thunk/catalogs';

const bParamsForCurShop = ({ id, type, shop }) => {
  return {
    id,
    title: `Поисковый запрос '${id}'`,
    idLb: (type === 'lb') ? 'labirint-javascript' : null,
    idCg: (type === 'cg') ? 'ch-javascript' : null,
    shops: {
      cg: (type === 'cg') ? shop : [],
      lb: (type === 'lb') ? shop : []
    },
  }
}

const initialState = {
  error: false,
  load: true,
  isReloadCatalogBtn: false,
  isReloadCatalog: false,
  timeLoad: null,
  mainLinks: [],
  catalogs: [],
};

const catalogs = createSlice({
  name: 'catalogs',
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
    // Конкретный магазин, читай-город или лабиринт
    addShopInCatalogs(state, { payload }) {
      const { id, shop, type } = payload;

      state.load = false;
      state.timeLoad = Date.now();

      let bParam = bParamsForCurShop({ id, type, shop });

      state.catalogs.push(bParam);
    },
    // Нужно ли показывать кнопку обновить каталог товаров
    setIsReloadCatalogBtn(state) {
      state.isReloadCatalogBtn = true;
    },
    setIsReloadCatalog(state) {
      state.isReloadCatalog = true;
      state.catalogs = [];
    }
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

        state.isReloadCatalog = false;
        state.isReloadCatalogBtn = false;
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

          state.isReloadCatalog = false;
          state.isReloadCatalogBtn = false;
        }
      })
      .addCase(loadCurCategory.rejected, (state) => {
        state.load = false;
        state.error = true;
      })
      // Фраза или для лабиринта, или для читай-города
      .addCase(loadCurShop.pending, (state) => {
        state.load = true;
        state.error = false;
      })
      .addCase(loadCurShop.fulfilled, (state, action) => {
        if (action.payload) {
          state.timeLoad = Date.now();
          state.load = false;
          state.error = false;

          const { id, type, shop } = action.payload;

          const idx = state.catalogs.findIndex((el) => el.id === id);

          if (idx === -1) {
            let bParam = bParamsForCurShop({ id, type, shop });

            state.catalogs.push(bParam);
          }
          
          if (idx !== -1) {
            const dShop = (type === 'cg') ? 'ch-javascript' : 'labirint-javascript';
            const tShop = (type === 'cg') ? 'idCg' : 'idLb';

            state.catalogs[idx][tShop] = dShop;
            state.catalogs[idx].shops[type] = shop;
          }

          state.isReloadCatalog = false;
          state.isReloadCatalogBtn = false;
        }
      })
      .addCase(loadCurShop.rejected, (state) => {
        state.load = false;
        state.error = true;
      })
  }
})

const {
  addCatalogs,
  addMainLinks,
  addCategoryInCatalogs,
  addShopInCatalogs,
  setIsReloadCatalogBtn,
  setIsReloadCatalog,
} = catalogs.actions;

export {
  addCatalogs,
  addMainLinks,
  addCategoryInCatalogs,
  addShopInCatalogs,
  loadCatalog,
  loadCurShop,
  loadCurCategory,
  setIsReloadCatalogBtn,
  setIsReloadCatalog,
}

export default catalogs.reducer;
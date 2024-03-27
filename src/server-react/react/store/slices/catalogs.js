import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getMainPage, getCurCategory, getCurShop } from '@api/';

const loadCatalog = createAsyncThunk(
  'catalogs/loadCatalog',
  async () => {
    const response = await getMainPage();

    return response.data;
  }
);

// Товары для читай-города и лабиринта
const loadCurCategory = createAsyncThunk(
  'catalogs/loadCurCategory',
  async (fraze) => {
    const response = await getCurCategory(fraze);

    return response.data;
  }
);
// Для конкретно магазина, читай-город или лабиринт
const loadCurShop = createAsyncThunk(
  'catalogs/loadCurShop',
  async ({ fraze, type }) => {
    const response = await getCurShop(fraze, type);

    return response.data;
  }
);

const initialState = {
  error: false,
  load: true,
  timeLoad: null,
  mainLinks: [],
  catalogs: [],
};

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

          state.catalogs.push(action.payload);
        }
      })
      .addCase(loadCurCategory.rejected, (state) => {
        state.load = false;
        state.error = true;
      })
      // Фраза или для лабиринта, или для читай города
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

          let bParam = bParamsForCurShop({ id, type, shop });

          state.catalogs.push(bParam);
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
  addShopInCatalogs
} = catalogs.actions;

export {
  loadCatalog,
  addCatalogs,
  addMainLinks,
  loadCurCategory,
  addCategoryInCatalogs,
  addShopInCatalogs,
  loadCurShop,
}

export default catalogs.reducer;
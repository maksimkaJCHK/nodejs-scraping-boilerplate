import { createAsyncThunk } from '@reduxjs/toolkit';
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

export {
  loadCatalog,
  loadCurCategory,
  loadCurShop
}
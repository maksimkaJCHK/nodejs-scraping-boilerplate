import { createAsyncThunk } from '@reduxjs/toolkit';
import { getNewPage, getNewCurCategory } from '@api/';

const loadCatalog = createAsyncThunk(
  'new-catalogs/loadCatalog',
  async () => {
    const response = await getNewPage();

    return response.data;
  }
);

// Товары для читай-города и лабиринта
const loadCurCategory = createAsyncThunk(
  'new-catalogs/loadCurCategory',
  async (fraze) => {
    const response = await getNewCurCategory(fraze);

    return response.data;
  }
);

export {
  loadCatalog,
  loadCurCategory,
}
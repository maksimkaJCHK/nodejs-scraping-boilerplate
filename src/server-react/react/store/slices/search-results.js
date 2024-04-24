import { createSlice } from '@reduxjs/toolkit';

import { loadSearchResults } from '@thunk/search-results';

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
  load: false,
  catalogs: {},
};

const searchResults = createSlice({
  name: 'searchResults',
  initialState,
  reducers: {
    addCatalogs(state, { payload }) {
      state.load = false;
      state.catalogs = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Главная страниц
      .addCase(loadSearchResults.pending, (state) => {
        state.load = true;
        state.error = false;
      })
      .addCase(loadSearchResults.fulfilled, (state, action) => {
        state.load = false;
        state.error = false;

        state.catalogs = action.payload;
      })
      .addCase(loadSearchResults.rejected, (state) => {
        state.load = false;
        state.error = true;
      })
  }
})

const {

} = searchResults.actions;

export {

}

export default searchResults.reducer;
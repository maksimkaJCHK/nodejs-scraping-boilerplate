import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSearch } from '@api/';

const loadSearchResults = createAsyncThunk(
  'search-results/loadSearchResults',
  async (fraze) => {
    const response = await getSearch(fraze);

    return response.data;
  }
);

export {
  loadSearchResults
}
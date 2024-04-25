import React,  { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import useTypeParams from '@hooks/useTypeParams.js';
import { loadSearchResults } from '@thunk/search-results';

const useGetParams = (setSearch) => {
  const { dispatch } = useTypeParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const frazeParam = searchParams.get('fraze');

  const changeGetFraze = (fraze) => {
    let search = undefined;

    if (fraze) search = { fraze: fraze };

    setSearchParams(search, { replace: true });
  };

  useEffect(() => {
    if (frazeParam) {
      setSearch(frazeParam);
      dispatch(loadSearchResults(frazeParam));
    }
  }, [frazeParam]);

  return { changeGetFraze };
}

export default useGetParams;
import React, { useState, useEffect, useRef } from 'react';

import useTypeParams from '@hooks/useTypeParams.js';
import useForm from '@pageHooks/search/useForm.js';
import useGetParams from '@pageHooks/search/useGetParams.js';

import { resetCatalogs } from '@slices/search-results';

import AllShopsCont from './content/AllShopsCont';

import Preload from '@components/ui/Preload';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';

import './styles/_search.scss';

const Search = () => {
  const inp = useRef(null);
  const { dispatch, useSelector } = useTypeParams();

  const [search, setSearch] = useState('');

  const { catalogs, load } = useSelector(state => state.searchResults)
  const { changeGetFraze } = useGetParams(setSearch);

  const {
    searchAfterReq,
    disabled,
    handleChangeSearch,
    handleSubmit,
  } = useForm({
    changeGetFraze,
    catalogs,
    search,
    setSearch
  });

  useEffect(() => () => dispatch(resetCatalogs()), []);

  useEffect(() => {
    if (load) inp.current.blur();
    if (!load) inp.current.focus();
  }, [load]);

  return (
    <div className = 'search'>
      <Preload load = { load } />

      <form
        className = "search-form"
        onSubmit = { handleSubmit }
      >
        <Input
          ref = { inp }
          value = { search }
          onChange = { handleChangeSearch }
        />
        <Button disabled = { disabled }>
          Найти
        </Button>
      </form>

      {
        Object.keys(catalogs).length
          ? <AllShopsCont
              title = {`Поиск по фразе "${ searchAfterReq }" для интернет-магазинов`}
              category = { catalogs }
            />
          : null
      }
    </div>
  )
}

export default Search;
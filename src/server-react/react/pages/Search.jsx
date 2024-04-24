import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadSearchResults } from '@thunk/search-results';

import AllShopsCont from './content/AllShopsCont';

import Preload from '@components/ui/Preload';
import Input from '@components/ui/Input';
import Button from '@components/ui/Button';

import './styles/_search.scss';

const Search = () => {
  const [search, setSearch] = useState('');
  const [searchAfterReq, setSearchAfterReq] = useState('');
  const [disabled, setDiasbled] = useState(true);

  const dispatch = useDispatch();
  const { catalogs, load } = useSelector(state => state.searchResults)

  const isReq = search.trim().length === 0;

  useEffect(() => {
    setDiasbled(isReq);
  }, [search]);

  useEffect(() => {
    if (!load) {
      setSearchAfterReq(search);
      setSearch('');
    }
  }, [load]);

  const changeSearch = (e) => {
    setSearch(e.target.value);
  };

  const searchResults = (e) => {
    e.preventDefault();

    dispatch(loadSearchResults(search));
  };

  return (
    <div className = 'search'>
      <Preload load = { load } />

      <form
        className = "search-form"
        onSubmit = { searchResults }
      >
        <Input
          value = { search }
          onChange = { changeSearch }
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
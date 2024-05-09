import React from 'react';

import Preload from '../../components/ui/Preload';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const Search = ({ load, search, disabled }) => {
  return (
    <div className = 'search'>
      <Preload load = { load } />

      <form className = "search-form" >
        <Input
          value = { search }
          onChange = { (e) => e }
        />
        <Button disabled = { disabled }>
          Найти
        </Button>
      </form>
    </div>
  )
}

export default Search;
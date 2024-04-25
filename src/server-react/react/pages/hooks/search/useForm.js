import React, { useEffect, useState } from 'react';

const useForm = ({
  changeGetFraze,
  catalogs,
  search,
  setSearch
}) => {
  const [searchAfterReq, setSearchAfterReq] = useState('');
  const [disabled, setDiasbled] = useState(true);

  const isReq = search.trim().length === 0;

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    changeGetFraze(search.trim());
  };

  useEffect(() => setDiasbled(isReq), [search]);

  useEffect(() => {
    if (Object.keys(catalogs).length !== 0) {
      setSearchAfterReq(search);
      setSearch('');
    }
  }, [catalogs]);

  return {
    search,
    searchAfterReq,
    disabled,
    setSearch,
    handleChangeSearch,
    handleSubmit,
  }
}

export default useForm;
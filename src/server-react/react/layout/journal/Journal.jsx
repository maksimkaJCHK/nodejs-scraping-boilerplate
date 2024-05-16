import React, { useEffect } from 'react';

import useTypeParams from '@hooks/useTypeParams.js';

import { changeIsJournal, closeJournal } from '@slices/journal'

import JournalItems from './JournalItems';

import './_journal.scss';

const Journal = () => {
  const { dispatch, useSelector } = useTypeParams();
  const { isJournal, journal } = useSelector(state => state.journal);

  useEffect(() => {
    window.addEventListener('click', () => dispatch(closeJournal()));
  }, []);

  const handleJournal = (e) => {
    e.stopPropagation();
    dispatch(changeIsJournal());
  }

  const journalClass = [
    'journal',
    isJournal ? 'journal-open' : null
  ].join(' ');

  return (
    <div
      className = { journalClass }
      
    >
      <div
        className = "journal-label"
        onClick = { handleJournal}
      >
        Журнал
      </div>

      <div 
        className="wrapper"
        onClick = { (e) => e.stopPropagation() }
      >
        <JournalItems items = {journal} />
      </div>
    </div>
  )
}

export default Journal;
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

  const journalClass = [
    'journal',
    isJournal ? 'journal-open' : null
  ].join(' ');

  return (
    <div
      className = { journalClass }
      onClick = { (e) => e.stopPropagation() }
    >
      <div
        className = "journal-label"
        onClick = { () => dispatch(changeIsJournal()) }
      >
        Журнал
      </div>

      <div className="wrapper">
        <JournalItems items = {journal} />
      </div>
    </div>
  )
}

export default Journal;
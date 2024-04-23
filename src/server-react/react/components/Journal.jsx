import React from 'react';

import { useSelector, useDispatch } from 'react-redux';

import { changeIsJournal } from '@slices/journal'

import JournalItem from './JournalItem';

import './_journal.scss';

const Journal = () => {
  const { isJournal, journal } = useSelector(state => state.journal);
  const dispatch = useDispatch();

  const journalClass = [
    'journal',
    isJournal ? 'journal-open' : null
  ].join(' ');

  return (
    <div className = { journalClass }>
      <div
        className = "journal-label"
        onClick = { () => dispatch(changeIsJournal()) }
      >
        Журнал
      </div>

      <div className="wrapper">
        <JournalItem items = {journal} />
      </div>
    </div>
  )
}

export default Journal;
import React from 'react';

import FrazeNull from './ui/FrazeNull';

import './_journal-item.scss';

const JournalItem = ({ items }) => {
  if (!items.length) {
    return <FrazeNull text = "Журнал пуст." />;
  }

  return (
    <>
      {
        items.map(({ message, id, time, date }) => {
          return (
            <div 
              className = 'journal-item'
              key = {id}
            >
              <div className = "journal-item-time">
                { time } <span>{ date}</span>
              </div>
              { message }
            </div>
          )
        })
      }
    </>
  )
}

export default JournalItem;
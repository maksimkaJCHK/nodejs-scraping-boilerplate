import React from 'react';

import FrazeNull from '../../components/ui/FrazeNull';

const JournalItems = ({ items }) => {
  if (!items.length) {
    return <FrazeNull text = "Журнал пуст." />;
  }

  return (
    <div className="journal-wrap-items">
      {
        items.map(({
          message,
          id,
          time,
          date,
          type
        }) => {
          const bClassName = ['journal-item'];

          if (type !== 'msg') bClassName.push(`journal-item-${type}`);

          return (
            <div 
              className = { bClassName.join(' ') }
              key = { id }
            >
              <div className = "journal-item-time">
                { date } <span>{ time}</span>
              </div>
              <div className="journal-item-message">
                { message }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default JournalItems;
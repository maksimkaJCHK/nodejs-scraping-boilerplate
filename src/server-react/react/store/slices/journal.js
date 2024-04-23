import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isJournal: false,
  journal: []
};

const monthArr = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

const bTime = (time) => {
  const bTime = new Date(time);

  const date = bTime.getDate();
  const month = monthArr[bTime.getMonth()];
  const year = bTime.getFullYear();
  const hour = bTime.getHours();
  const minute = bTime.getMinutes();

  return {
    time: `${hour}:${minute}`,
    date: `${date} ${month} ${year}`
  };
};

const journal = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    openJournal(state) {
      state.isJournal = true;
    },
    changeIsJournal(state) {
      state.isJournal = !state.isJournal;
    },
    addInJournal(state, { payload }) {
      const cTime = Date.now();
      const bcTime = bTime(cTime)

      state.journal.unshift({
        ...payload,
        id: cTime,
        time: bcTime.time,
        date: bcTime.date
      });
    }
  },
})

const {
  changeIsJournal,
  addInJournal,
  openJournal,
} = journal.actions;

export {
  changeIsJournal,
  addInJournal,
  openJournal,
}

export default journal.reducer;
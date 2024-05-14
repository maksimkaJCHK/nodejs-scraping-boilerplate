import { createSlice } from '@reduxjs/toolkit';
import { bTime } from '@helpers/typeHelpers';

const jsonData = JSON.parse(localStorage.getItem('journal'));

const initialState = {
  isJournal: false,
  journal: jsonData || [],
};

const journal = createSlice({
  name: 'journal',
  initialState,
  reducers: {
    openJournal(state) {
      state.isJournal = true;
    },
    closeJournal(state) {
      state.isJournal = false;
    },
    changeIsJournal(state) {
      state.isJournal = !state.isJournal;
    },
    addInJournal(state, { payload }) {
      const cTime = new Date();
      const bcTime = bTime(cTime)

      state.journal.unshift({
        ...payload,
        id: cTime.getTime(),
        time: bcTime.time,
        date: bcTime.date
      });

      localStorage.setItem('journal', JSON.stringify(state.journal.slice(0, 10)));
    }
  },
})

const {
  changeIsJournal,
  addInJournal,
  openJournal,
  closeJournal,
} = journal.actions;

export {
  changeIsJournal,
  addInJournal,
  openJournal,
  closeJournal,
}

export default journal.reducer;
// redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import studentsReducer from './studentsSlice';

export const store = configureStore({
  reducer: {
    students: studentsReducer,
  },
});
export default store;
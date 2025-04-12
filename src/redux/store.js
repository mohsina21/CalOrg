import {createSlice } from "@reduxjs/toolkit";
import { configureStore } from "@reduxjs/toolkit";
import eventReducer from  "./eventslice" 


const store = configureStore({
  reducer: {
    events: eventReducer,
  },
});

export default store;

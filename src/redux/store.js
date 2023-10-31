import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    addContact(state, action) {
      return state;
    },
    deleteContact(state, action) {
      return state;
    },
  },
});

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    addFilter(state, action) {
      return action.payload;
    },
  },
});

export const { addContact, deleteContact } = contactsSlice.actions;
export const { addFilter } = filterSlice.actions;

export const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
    filter: filterSlice.reducer,
  },
});

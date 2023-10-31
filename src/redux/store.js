import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    setContactList(state, action) {
      return [...state, ...action.payload];
    },
    addContact(state, action) {
      return [...state, action.payload];
    },
    deleteContact(state, action) {
      return state.filter(elem => elem.id !== action.payload);
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

export const { addContact, deleteContact, setContactList } =
  contactsSlice.actions;
export const { addFilter } = filterSlice.actions;

export const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
    filter: filterSlice.reducer,
  },
});

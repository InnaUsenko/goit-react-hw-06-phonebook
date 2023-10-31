import React, { useEffect } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactFilter } from './ContactFilter/ContactFilter';
import { ContactList } from './ContactList/ContactList';
import localStorage from '../services/storage';
import { useSelector, useDispatch } from 'react-redux';
import { setContactList } from '../redux/store';

export const App = () => {
  const dispatch = useDispatch();
  const contactsRedux = useSelector(state => state.contacts);

  //componentDidMount();
  useEffect(() => {
    const localContacts = localStorage.load('phoneBook');
    if (localContacts && localContacts.length > 0) {
      dispatch(setContactList(localContacts));
    }
  }, [dispatch]);

  //componentDidUpdate(prevProps, prevState, snapshot);
  useEffect(() => {
    localStorage.save('phoneBook', contactsRedux);
  }, [contactsRedux]);

  return (
    <div
      style={{
        width: 400,
        marginLeft: '8px',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <ContactFilter />
      <ContactList />
    </div>
  );
};

import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactFilter } from './ContactFilter/ContactFilter';
import { ContactList } from './ContactList/ContactList';
import localStorage from '../services/storage';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, setContactList, addFilter } from '../redux/store';

export const App = () => {
  const dispatch = useDispatch();
  const contactsRedux = useSelector(state => state.contacts);

  const addCnt = contact => {
    const names = contactsRedux.map(elem => elem.name.toLowerCase());
    if (names.includes(contact.name.toLowerCase())) {
      window.alert('The name ' + contact.name + ' already exists');
      return;
    }

    const newContact = {
      id: nanoid(),
      name: contact.name,
      number: contact.number,
    };

    dispatch(addContact(newContact));
  };

  //componentDidMount();
  useEffect(() => {
    const localContacts = localStorage.load('phoneBook');
    console.log('componentDidMount');
    if (localContacts && localContacts.length > 0) {
      dispatch(setContactList(localContacts));
    }
  }, [dispatch]);

  //componentDidUpdate(prevProps, prevState, snapshot);
  useEffect(() => {
    console.log('componentDidUpdate');
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
      <ContactForm addContact={addCnt} />
      <h2>Contacts</h2>
      <ContactFilter
        handleFiltering={name => {
          dispatch(addFilter(name.toLowerCase()));
        }}
      />
      <ContactList />
    </div>
  );
};

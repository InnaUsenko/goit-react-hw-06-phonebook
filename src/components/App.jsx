import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactFilter } from './ContactFilter/ContactFilter';
import { ContactList } from './ContactList/ContactList';
import localStorage from '../services/storage';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, deleteContact, addFilter } from '../redux/store';

export const App = () => {
  const dispatch = useDispatch();
  const filterRedux = useSelector(state => state.filter);
  const contactsRedux = useSelector(state => state.contacts);
  const [contacts, setContacts] = useState([]);
  const [filter, setFilter] = useState('');

  const addContact = contact => {
    const names = contacts.map(elem => elem.name.toLowerCase());
    if (names.includes(contact.name.toLowerCase())) {
      window.alert('The name ' + contact.name + ' already exists');
      return;
    }

    const newContact = {
      id: nanoid(),
      name: contact.name,
      number: contact.number,
    };

    const localContacts = [...contacts];
    localContacts.push(newContact);
    setContacts(localContacts);
  };

  const findContact = () => {
    return contacts.filter(el => {
      const curName = el.name;
      let temp = curName.substr(0, filterRedux.length);
      return filterRedux.toLowerCase() === temp.toLowerCase();
    });
  };

  const deleteContact = id => {
    const localContacts = contacts.filter(elem => elem.id !== id);
    setContacts(localContacts);
  };

  //componentDidMount();
  useEffect(() => {
    const localContacts = localStorage.load('phoneBook');
    console.log('componentDidMount');
    if (localContacts && localContacts.length > 0) {
      setContacts(localContacts);
    }
  }, []);

  //componentDidUpdate(prevProps, prevState, snapshot);
  useEffect(() => {
    console.log('componentDidUpdate');
    localStorage.save('phoneBook', contacts);
  }, [contacts]);

  return (
    <div
      style={{
        width: 400,
        marginLeft: '8px',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <ContactFilter
        handleFiltering={name => {
          dispatch(addFilter(name.toLowerCase()));
        }}
      />
      <ContactList contacts={findContact} handleDelete={deleteContact} />
    </div>
  );
};

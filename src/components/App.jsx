import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from './ContactForm/ContactForm';
import { ContactFilter } from './ContactFilter/ContactFilter';
import { ContactList } from './ContactList/ContactList';
import localStorage from '../services/storage';

export const App = () => {
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

  const addFilter = name => {
    setFilter(name.toLowerCase());
  };

  const findContact = () => {
    return contacts.filter(el => {
      const curName = el.name;
      let temp = curName.substr(0, filter.length);
      return filter.toLowerCase() === temp.toLowerCase();
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
      <ContactFilter handleFiltering={addFilter} />
      <ContactList contacts={findContact} handleDelete={deleteContact} />
    </div>
  );
};

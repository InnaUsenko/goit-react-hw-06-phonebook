import React, { useState } from 'react';
import css from './ContactForm.module.css';
import { nanoid } from 'nanoid';
import { useSelector, useDispatch } from 'react-redux';
import { addContact } from '../../redux/store';

export const ContactForm = () => {
  const dispatch = useDispatch();
  const contactsRedux = useSelector(state => state.contacts);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = evt => {
    const tagName = evt.target.name;
    const value = evt.target.value;
    if (tagName === 'name') {
      setName(value);
    }
    if (tagName === 'number') {
      setNumber(value);
    }
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    addCnt({ name: name, number: number });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

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

  return (
    <div>
      <form className={css.form} onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="number">Number</label>
        <br />
        <input
          id="number"
          type="tel"
          name="number"
          value={number}
          onChange={handleChange}
          required
        />
        <br />
        <button className={css.btn} type="submit">
          Add contact
        </button>
      </form>
    </div>
  );
};

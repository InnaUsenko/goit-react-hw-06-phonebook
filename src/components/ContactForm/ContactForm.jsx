import React, { useState } from 'react';
import css from './ContactForm.module.css';

export const ContactForm = props => {
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
    props.addContact({ name: name, number: number });
    console.log(name + ' ' + number);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
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

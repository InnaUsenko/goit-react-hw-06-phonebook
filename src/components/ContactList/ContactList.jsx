import css from './ContactList.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/store';

export const ContactList = () => {
  const dispatch = useDispatch();
  const contactsRedux = useSelector(state => state.contacts);
  const filterRedux = useSelector(state => state.filter);

  const findContact = () => {
    return contactsRedux.filter(el => {
      let temp = el.name.substr(0, filterRedux.length);
      return filterRedux.toLowerCase() === temp.toLowerCase();
    });
  };

  return (
    <ul>
      {findContact().map(elem => {
        return (
          <li key={elem.id}>
            <span style={{ display: 'line-block', marginRight: 16 }}>
              {elem.name}: {elem.number}
            </span>
            <button
              id={elem.id}
              onClick={() => dispatch(deleteContact(elem.id))}
              className={css.btn}
            >
              Delete
            </button>
          </li>
        );
      })}
    </ul>
  );
};

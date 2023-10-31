import css from './ContactFilter.module.css';
import { useDispatch } from 'react-redux';
import { addFilter } from '../../redux/store';

export const ContactFilter = () => {
  const dispatch = useDispatch();

  return (
    <div className={css.form}>
      <label htmlFor="filter">Find contacts by name</label>
      <br />
      <input
        id="filter"
        className={css.inp}
        type="text"
        name="filter"
        onChange={event => {
          dispatch(addFilter(event.target.value.toLowerCase()));
        }}
        required
      />
    </div>
  );
};

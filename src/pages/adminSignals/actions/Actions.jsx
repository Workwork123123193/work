import { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import Select from 'react-select';

import styles from './actions.module.scss';
import './reactSelect.scss';
import arrowIcon from '@assets/arrow-down-violet.svg';
import searchIcon from '@assets/search.svg';

const sorts = [
  { value: 'date,asc', label: 'Дате добавления (сначала новые)' },
  { value: 'date,desc', label: 'Дате добавления (сначала старые)' },
  { value: 'name,asc', label: 'Названию (с начала алфавита)' },
  { value: 'name,desc', label: 'Названию (с конца алфавита)' },
];

const Actions = ({ setTabs, setSort, setSearch }) => {
  const [localSearch, setLocalSearch] = useState('');

  const updateSearchValue = (e) => {
    setLocalSearch(e.target.value);
    onSearchChange(e.target.value);
  };

  const onSearchChange = useCallback(
    debounce((e) => {
      setSearch(e);
    }, 200),
    [],
  );

  return (
    <>
      <h1 className={styles.title}>Сигналы (2)</h1>
      <div className={styles.actions}>
        <button className={styles.button} onClick={() => setTabs('create')}>
          <span className={styles.plus}>+</span>
          <span className={styles.buttonSpan}>Добавить новый сигнал</span>
        </button>
        <div className={styles.selectWrapper}>
          <Select
            options={sorts}
            value={sorts.find((option) => option.label === sorts.label)}
            onChange={setSort}
            defaultValue={sorts[0]}
            classNamePrefix="select"
          />
        </div>
        <div className={styles.searchWrapper}>
          <input
            className={styles.search}
            onChange={updateSearchValue}
            value={localSearch}
            type="text"
            placeholder="Поиск"
          />
        </div>
      </div>
    </>
  );
};

export default Actions;

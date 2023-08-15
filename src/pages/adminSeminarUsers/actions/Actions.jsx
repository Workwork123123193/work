import { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import Select from 'react-select';

import styles from '../../adminSignals/actions/actions.module.scss';
import styles2 from '../../adminUsers/actions/actions.module.scss';
import '../../adminSignals/actions/reactSelect.scss';
import searchIcon from '@assets/search.svg';

const sorts = [
  { value: 'date,asc', label: 'Дате добавления (сначала новые)' },
  { value: 'date,desc', label: 'Дате добавления (сначала старые)' },
  { value: 'name,asc', label: 'Названию (с начала алфавита)' },
  { value: 'name,desc', label: 'Названию (с конца алфавита)' },
];

const Actions = ({ setSort, setSearch, count }) => {
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
      <h1 className={styles.title}>Список пользователей ({count})</h1>
      <div className={styles.actions}>
        <div className={styles2.selectWrapper}>
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
            className={styles.searchInput}
            onChange={updateSearchValue}
            value={localSearch}
            type="text"
            placeholder="Поиск"
          />
          <img className={styles.searchIcon} src={searchIcon} width={14} height={15} alt="search" />
        </div>
      </div>
    </>
  );
};

export default Actions;

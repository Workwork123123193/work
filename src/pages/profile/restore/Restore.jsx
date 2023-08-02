import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cn from 'classnames';

import styles from './restore.module.scss';
import styles2 from '../register/register.module.scss';

const Restore = () => {
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onRestoreHandler = async (data) => {
    console.log(data);
    // dispatch(fetchLogin(data)).then((data) => {
    //   if ('error' in data) {
    //     setMessage('Пользователь уже зарегистрирован');
    //   } else {
    //     reset();
    //     setMessage('Вы успешно зарегистрированы');
    //     navigate('/login');
    //   }
    // });
    //   .catch(() => {
    //     setMessage('Ошибка работы сервера');
    //   });
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles2.title}>Восстановление пароля</h2>
      <form className={styles2.form} onSubmit={handleSubmit(onRestoreHandler)}>
        <div className={styles2.item}>
          <input
            className={styles2.input}
            {...register('email', {
              maxLength: 50,
              minLength: 2,
            })}
            placeholder="Адрес электронной почты"
            type="email"
            name="email"
          />
          {errors?.email && <p className={styles2.error}>Введите почту</p>}
        </div>
        <input className={cn(styles2.btn, styles.btn)} type="submit" />
      </form>
    </div>
  );
};

export default Restore;

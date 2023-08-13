import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import styles from './register.module.scss';
import { fetchRegistration } from '@redux/user/userSlice';

const Register = ({ setActiveTab1, setActiveTab2, setIsConfirm, setConfirmLink }) => {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const password = watch('password');

  const onLoginToggle = () => {
    setActiveTab2('null');
    setActiveTab1('login');
  };

  const onRegisterHandler = async (data) => {
    const { cpassword, ...formData } = data;

    reset();

    dispatch(fetchRegistration(JSON.stringify(formData)))
      .then((data) => {
        if (data.error?.message?.includes('409')) {
          toast('Такой пользователь уже существует');
        } else {
          setConfirmLink(data.payload.confirmLink);
          toast('Подтвердите почту');
          setActiveTab2('null');
          setIsConfirm(true);
          reset();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>Регистрация</h2>
      <form className={styles.form} onSubmit={handleSubmit(onRegisterHandler)}>
        <div className={styles.item}>
          <input
            className={styles.input}
            {...register('firstName', {
              required: true,
              minLength: 1,
              pattern: /^[A-Za-zА-Яа-я ]+$/i,
            })}
            placeholder="Имя"
            type="name"
            name="firstName"
            required
          />
        </div>
        <div className={styles.item}>
          <input
            className={styles.input}
            {...register('lastName', {
              required: true,
              minLength: 1,
              pattern: /^[A-Za-zА-Яа-я ]+$/i,
            })}
            placeholder="Фамилия"
            type="name"
            name="lastName"
            required
          />
        </div>
        <div className={styles.item}>
          <input
            className={styles.input}
            {...register('email', {
              required: true,
            })}
            placeholder="Email"
            type="email"
            name="email"
            required
          />
        </div>
        <div className={styles.item}>
          <input
            className={styles.input}
            {...register('password', {
              required: true,
            })}
            placeholder="Пароль"
            type="password"
            name="password"
            required
          />
        </div>
        <div className={styles.item}>
          <input
            className={styles.input}
            {...register('cpassword', {
              required: true,
              validate: (value) => value === password,
            })}
            placeholder="Повторите пароль"
            type="password"
            name="cpassword"
            required
          />
          {errors?.cpassword?.type === 'validate' && (
            <p className={styles.error}>Пароли не совпадают</p>
          )}
        </div>
        <div className={styles.bottom}>
          <div className={styles.bottomLeft}>
            <span className={styles.bottomText}>Уже есть аккаунт?</span>
            <span className={styles.bottomLogin} onClick={onLoginToggle}>
              Войти в аккаунт
            </span>
          </div>
          <div className={styles.bottomRight}>
            <input className={styles.btn} type="submit" value="Зарегистрироваться" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Register;

import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from './login.module.scss';
import styles2 from '../register/register.module.scss';
import { setToken } from '@service/token';
import { fetchLogin } from '@redux/user/userSlice';

const Login = ({ setActiveTab1, setActiveTab2 }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onLoginHandler = async (data) => {
    try {
      const response = await dispatch(fetchLogin(JSON.stringify(data)));
      if ('error' in response) {
        if (response.error.message.includes('403')) {
          toast('Неверный пароль');
        } else if (response.error.message.includes('404')) {
          toast('Такого пользователя не существует');
        } else {
          console.log(response);
        }
      } else {
        navigate('/');
        toast('Вы авторизованы');
        setToken(response.payload.token);
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onRegisterToggle = () => {
    setActiveTab2('register');
    setActiveTab1('null');
  };

  const onRestoreToggle = () => {
    setActiveTab2('restore');
    setActiveTab1('null');
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles2.title}>Вход</h2>
      <form className={styles.form} onSubmit={handleSubmit(onLoginHandler)}>
        <div className={styles2.item}>
          <input
            required
            className={styles2.input}
            {...register('email', {
              required: true,
            })}
            placeholder="Адрес электронной почты"
            type="email"
            name="email"
          />
        </div>
        <div className={styles2.item}>
          <input
            required
            className={styles2.input}
            {...register('password', {
              required: true,
            })}
            placeholder="Пароль"
            type="password"
            name="password"
          />
        </div>
        <div className={styles2.bottom}>
          <div className={styles2.bottomLeft}>
            <div className={styles.bottomLeftTop}>
              <span className={styles2.bottomText}>Нет аккаунта?</span>
              <span className={styles2.bottomLogin} onClick={onRegisterToggle}>
                Зарегистрироваться
              </span>
            </div>
            <div className={styles.bottomBottom}>
              <span className={styles2.bottomLogin} onClick={onRestoreToggle}>
                Забыл пароль
              </span>
            </div>
          </div>
          <div className={styles.bottomRight}>
            <input className={styles2.btn} type="submit" value="Войти" />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;

// Адрес электронной почты

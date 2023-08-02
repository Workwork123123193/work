import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import styles from './editCabinet.module.scss';
import avatarPng from '@assets/user.png';
import avatarWebp from '@assets/user.webp';
import updateImg from '@assets/change-avatar.svg';
import deleteImg from '@assets/delete.svg';
import { useDispatch } from 'react-redux';
import {
  getAvatar,
  setAvatar,
  deleteAvatar,
  getProfile,
  updateProfile,
  deleteProfile,
  getSeminars,
} from '@service/user/profile';
import { logout } from '../../../redux/user/userSlice';

const EditCabinet = ({ user, setUser, handleToggleEditMode }) => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [data, setData] = useState({ firstName: user.firstName, lastName: user.lastName });
  const [img, setImg] = useState(null);

  const handleUpdateFirstName = (e) => {
    setData({ ...data, firstName: e.target.value });
  };

  const handleUpdateLastName = (e) => {
    setData({ ...data, lastName: e.target.value });
  };

  const handleSetImg = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();

    formData.append('file', file);

    console.log(...formData);

    setAvatar(formData)
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteImg = async () => {
    //  deleteAvatar()
  };

  const handleOpenFile = () => {
    fileRef.current.click();
  };

  const handleUpdatePfoile = async (e) => {
    e.preventDefault();
    try {
      const response = await updateProfile(data);

      setUser((prev) => ({ ...prev, ...data }));
      handleToggleEditMode();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const response = await deleteProfile();
      dispatch(logout());
      toast('Профиль удален');
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   getProfile().then((data) => {
  //     setUser(data);
  //     console.log(data);
  //   });
  // }, []);

  // useEffect(() => {
  //   getAvatar().then((data) => {
  //     setImg(data);
  //   });
  // }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.edit}>
        <div className={styles.imgWrapper}>
          {user.avatarUrl === null ? (
            <picture>
              <source srcSet={avatarWebp} type="image/webp" />
              <img
                className={styles.avatar}
                src={avatarPng}
                width={150}
                height={150}
                alt="avatar"
              />
            </picture>
          ) : (
            <img
              className={styles.avatar}
              src={user.avatarUrl}
              width={150}
              height={150}
              alt="avatar"
            />
          )}
        </div>
        <div className={styles.buttons}>
          <form className={styles.formImg}>
            <input
              className={styles.formImgInput}
              onChange={handleSetImg}
              ref={fileRef}
              type="file"
              name="file"
            />
          </form>
          <button className={styles.btn} onClick={handleOpenFile}>
            <img
              className={styles.btnUpdate}
              src={updateImg}
              width={15}
              height={15}
              alt="change avatar"
            />
          </button>
          <button className={styles.btn} onClick={handleDeleteImg}>
            <img src={deleteImg} width={15} height={20} alt="change avatar" />
          </button>
        </div>
      </div>
      <form className={styles.formNames} onSubmit={handleUpdatePfoile}>
        <input
          className={styles.formNamesInput}
          value={data.firstName}
          onChange={handleUpdateFirstName}
          type="text"
        />
        <input
          className={styles.formNamesInput}
          value={data.lastName}
          onChange={handleUpdateLastName}
          type="text"
        />
        <button className={styles.btnSave}>Сохранить изменения</button>
      </form>
      <button className={styles.btnDeleteProfile} onClick={handleDeleteProfile}>
        Удалить профиль
      </button>
    </div>
  );
};

export default EditCabinet;

// const setAvatar = async (payload) => {
//     const { data } = await authClient().post(`profile/avatar`, payload);
//     return data;
//   };

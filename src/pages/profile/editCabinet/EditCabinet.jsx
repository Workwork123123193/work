import { useState, useEffect, useRef } from 'react';
import { toast } from 'react-toastify';
import styles from './editCabinet.module.scss';
import avatarPng from '@assets/user.png';
import avatarWebp from '@assets/user.webp';
import updateImg from '@assets/change-avatar.svg';
import deleteImg from '@assets/delete.svg';
import { useDispatch } from 'react-redux';
import {
  setAvatar,
  getAvatar,
  deleteAvatar,
  updateProfile,
  deleteProfile,
} from '@service/user/profile';
import { logout } from '@redux/user/userSlice';

const EditCabinet = ({
  user,
  setUser,
  isImgDelete,
  setIsImgDelete,
  setImg2,
  handleToggleEditMode,
}) => {
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const [data, setData] = useState({ firstName: user.firstName, lastName: user.lastName });
  const [img, setImg] = useState(null);

  useEffect(() => {
    const fetchImg = async () => {
      try {
        const response = await getAvatar();
        const blob = new Blob([response]);
        const url = URL.createObjectURL(blob);
        setImg(url);
      } catch (error) {
        console.log(error);
      }
    };
    fetchImg();
  }, [isImgDelete]);

  const handleUpdateFirstName = (e) => {
    setData({ ...data, firstName: e.target.value });
  };

  const handleUpdateLastName = (e) => {
    setData({ ...data, lastName: e.target.value });
  };

  const handleSetImg = async (e) => {
    const file = e.target.files[0];
    setAvatar(file)
      .then((data) => {
        setIsImgDelete((prev) => !prev);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDeleteImg = async () => {
    try {
      setImg(null);
      setImg2(null);
      setIsImgDelete((prev) => !prev);
      fileRef.current.value = '';
      const response = await deleteAvatar();
    } catch (error) {
      console.log(error);
    }
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

  return (
    <div className={styles.wrapper}>
      <div className={styles.edit}>
        <div className={styles.imgWrapper}>
          {img ? (
            <img className={styles.avatar} src={img} width={150} height={150} alt="avatar" />
          ) : (
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

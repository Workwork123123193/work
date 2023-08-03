import { useState, useEffect, useRef } from 'react';

import trash from '@assets/delete.svg';
import change from '@assets/change-img.svg';
import micro from '@assets/micro.svg';

import styles from './createSignal.module.scss';

const CreateSignal = ({ setTabs }) => {
  const [img, setImg] = useState(null);
  const imgRef = useRef();

  const handleAddImg = () => {
    imgRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setImg(file);
  };

  return (
    <>
      <h2 className={styles.title}>Новый сигнал</h2>
      <div className={styles.imgTitle}>Изображение сигнала</div>
      <div className={styles.imgWrapper}>
        <div className={styles.imgLoaded}></div>
        <div className={styles.imgChange} onClick={handleAddImg}>
          <input
            className={styles.imgInput}
            ref={imgRef}
            type="file"
            name="file"
            onChange={handleFileChange}
          />
          <img src={change} width={25} height={25} alt="change-img" />
          <span className={styles.imgSpan}>
            Заменить <br /> изображение
          </span>
        </div>
      </div>
      <div className={styles.title}>
        <button className={styles.buttons} onClick={() => setTabs('signals')}>
          Отмена
        </button>
        <button>Добавить семинар</button>
      </div>
    </>
  );
};

export default CreateSignal;

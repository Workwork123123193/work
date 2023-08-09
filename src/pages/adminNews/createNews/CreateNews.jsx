import { useState, useRef } from 'react';

import styles from '../../adminSignals/createSignal/createSignal.module.scss';
import { createNews, createImg } from '@service/admin/news';
import trash from '@assets/delete.svg';
import change from '@assets/change-img.svg';

const CreateSignal = ({ setTabs }) => {
  const imgRef = useRef();
  const [imgForViev, setImgForViev] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [theme, setTheme] = useState('');
  const [header, setHeader] = useState('');
  const [desk, setDesk] = useState('');

  const handleDeleteImg = () => {
    setImageUrl(null);
    setImgForViev(null);
    imgRef.current.value = '';
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImgForViev(URL.createObjectURL(file));
      setImageUrl(file);
    } else {
      setImgForViev(null);
      setImageUrl(null);
    }
  };

  const handleAddImg = () => {
    imgRef.current.click();
  };

  const sendNews = async () => {
    const news = {
      theme: theme,
      title: header,
      description: desk,
    };

    const { id } = await createNews(news);

    if (imageUrl) {
      try {
        const imgData = await createImg({ id, imageUrl });
      } catch (error) {
        console.error('Ошибка при отправке изображения:', error);
      }
    }

    setTabs('news');
  };

  return (
    <>
      <h2 className={styles.title}>Новая новость</h2>
      <div className={styles.imgTitle}>Изображение новости</div>
      <div className={styles.imgWrapper}>
        {imgForViev && (
          <div className={styles.imgLoaded}>
            <img src={imgForViev} width={180} height={104} alt="load-img" />
            <button className={styles.trashBtn} onClick={handleDeleteImg}>
              <img src={trash} alt="delete-img" />
            </button>
          </div>
        )}
        <div className={styles.imgChange} onClick={handleAddImg}>
          <input
            className={styles.imgInput}
            ref={imgRef}
            type="file"
            name="file"
            onChange={handleFileChange}
            accept="image/jpeg, image/jpg, image/png, image/webp"
          />
          <img src={change} width={25} height={25} alt="change-img" />
          <span className={styles.imgSpan}>
            Заменить <br /> изображение
          </span>
        </div>
      </div>
      <div className={styles.voice}>
        <div className={styles.themeTitle}>Заголовок новости</div>
        <input
          className={styles.themeInput}
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          type="text"
          name="title"
          placeholder="Введите тему"
        />
      </div>
      <div className={styles.header}>
        <div className={styles.headerTitle}>Заголовок новости</div>
        <input
          className={styles.headerInput}
          value={header}
          onChange={(e) => setHeader(e.target.value)}
          type="text"
          name="title"
          placeholder="Введите заголовок"
        />
      </div>
      <div className={styles.description}>
        <div className={styles.descriptionTitle}>Текст новости</div>
        <textarea
          className={styles.descriptionInput}
          value={desk}
          onChange={(e) => setDesk(e.target.value)}
          name="description"
          placeholder="Введите описание новости"></textarea>
      </div>
      <div className={styles.bottom}>
        <button className={styles.bottomCancel} onClick={() => setTabs('signals')}>
          Отмена
        </button>
        <button className={styles.bottomAdd} onClick={() => sendNews()}>
          Добавить новость
        </button>
      </div>
    </>
  );
};

export default CreateSignal;

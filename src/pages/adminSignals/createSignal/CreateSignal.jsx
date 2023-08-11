import { useState, useRef } from 'react';

import styles from './createSignal.module.scss';
import WaveFormLocal from '../waveSurfer/WafeSurferLocal.jsx';
import recorder from '../useRecorder/useRecorder';
import AudioRecorder from '../audio/AudioRecorder';
import { createSignall, createImg, createVoice } from '@service/admin/signals';
import trash from '@assets/delete.svg';
import change from '@assets/change-img.svg';

const CreateSignal = ({ setTabs }) => {
  const imgRef = useRef();
  const [imgForViev, setImgForViev] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [inputHeader, setInputHeader] = useState('');
  const [inputDesk, setInputDesk] = useState('');
  const [voiceUrl, setVoiceUrl] = useState(null);

  const handleDeleteVoice = () => {
    setVoiceUrl(null);
  };

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

  const sendSignal = async () => {
    const signal = {
      title: inputHeader,
      description: inputDesk,
    };

    const { id } = await createSignall(signal);

    if (imageUrl) {
      try {
        await createImg({ id, imageUrl });
      } catch (error) {
        console.error('Ошибка при отправке изображения:', error);
      }
    }

    if (voiceUrl) {
      try {
        await createVoice({ id, voiceUrl });
      } catch (error) {
        console.error('Ошибка при отправке аудио:', error);
      }
    }

    setTabs('signals');
  };

  return (
    <>
      <h2 className={styles.title}>Новый сигнал</h2>
      <div className={styles.imgTitle}>Изображение сигнала</div>
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
        <div className={styles.voiceTitle}>Голосовое сообщение</div>
        <div className={styles.voiceBtns}>
          <AudioRecorder recorder={recorder(setVoiceUrl)} />
        </div>
      </div>
      {voiceUrl && (
        <div className={styles.voiceWrapper}>
          <WaveFormLocal audio={voiceUrl} />
          <button className={styles.deleteVoice} onClick={handleDeleteVoice}>
            <img src={trash} alt="delete-voice" />
          </button>
        </div>
      )}
      <div className={styles.header}>
        <div className={styles.headerTitle}>Заголовок сигнала</div>
        <input
          className={styles.headerInput}
          value={inputHeader}
          onChange={(e) => setInputHeader(e.target.value)}
          type="text"
          name="title"
          placeholder="Введите заголовок"
        />
      </div>
      <div className={styles.description}>
        <div className={styles.descriptionTitle}>Описание сигнала</div>
        <textarea
          className={styles.descriptionInput}
          value={inputDesk}
          onChange={(e) => setInputDesk(e.target.value)}
          name="description"
          placeholder="Введите описание сигнала"></textarea>
      </div>
      <div className={styles.bottom}>
        <button className={styles.bottomCancel} onClick={() => setTabs('signals')}>
          Отмена
        </button>
        <button className={styles.bottomAdd} onClick={() => sendSignal()}>
          Добавить сигнал
        </button>
      </div>
    </>
  );
};

export default CreateSignal;

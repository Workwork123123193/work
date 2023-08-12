import { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import styles from '../adminSignals/createSignal/createSignal.module.scss';
import WaveFormLocal from '../adminSignals/waveSurfer/WafeSurferLocal';
import WaveFormUrl from '../../components/audio-player/Waveform';
import recorder from '../adminSignals/useRecorder/useRecorder';
import AudioRecorder from '../adminSignals/audio/AudioRecorder';
import trash from '@assets/delete.svg';
import change from '@assets/change-img.svg';
import {
  getSignal,
  updateSignall,
  getImg,
  createImg,
  deleteImg,
  getVoice,
  createVoice,
  deleteVoice,
} from '@service/admin/signals';

const AdminSignal = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const imgRef = useRef();
  const [inputHeader, setHeader] = useState('');
  const [inputDesk, setDesk] = useState('');
  const [imgForViev, setImgForViev] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isImgChange, setIsImgChange] = useState(false);
  const [voiceUrl, setVoiceUrl] = useState(null);
  const [voiceLocal, setVoiceLocal] = useState(null);
  const [isVoiceChange, setIsVoiceChange] = useState(false);

  useEffect(() => {
    const fetchSignal = async () => {
      try {
        const { title, description } = await getSignal(id);
        setHeader(title);
        setDesk(description);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSignal();
  }, [id]);

  useEffect(() => {
    const fetchImg = async () => {
      try {
        const { data } = await getImg(id);
        const blob = new Blob([data]);
        const url = URL.createObjectURL(blob);
        setImageUrl(url);
      } catch (error) {
        console.error(error);
      }
    };

    fetchImg();
  }, [id]);

  useEffect(() => {
    const fetchVoice = async () => {
      try {
        const { data } = await getVoice(id);
        const blob = new Blob([data]);
        var url = URL.createObjectURL(blob);
        setVoiceUrl(url);
      } catch (error) {
        console.error(error);
      }
    };

    fetchVoice();
  }, [id]);

  const handleDeleteVoice = () => {
    setVoiceUrl(null);
    setVoiceLocal(null);
    setIsVoiceChange(true);
  };

  const handleDeleteImg = () => {
    setImageUrl(null);
    setImgForViev(null);
    setIsImgChange(true);
    imgRef.current.value = '';
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setIsImgChange(true);

    if (file) {
      setImgForViev(URL.createObjectURL(file));
      setImageUrl(file);
      return;
    }

    setImgForViev(null);
    setImageUrl(null);
  };

  const handleAddImg = () => {
    imgRef.current.click();
  };

  const saveSignal = async () => {
    const signal = {
      title: inputHeader,
      description: inputDesk,
    };

    await updateSignall(id, signal);

    if (isImgChange && imageUrl) {
      try {
        await createImg({ id, imageUrl });
      } catch (error) {
        console.error('Ошибка при создании изображения:', error);
      }
    }

    if (isImgChange && !imageUrl) {
      try {
        await deleteImg(id);
      } catch (error) {
        console.error('Ошибка при удалении изображения:', error);
      }
    }

    if (voiceLocal) {
      try {
        console.log(id, voiceLocal);
        await createVoice(id, voiceLocal);
      } catch (error) {
        console.error('Ошибка при отправке аудио:', error);
      }
    }

    if (!voiceLocal && isVoiceChange) {
      try {
        await deleteVoice(id);
      } catch (error) {
        console.error('Ошибка при отправке аудио:', error);
      }
    }

    navigate('/signals');
  };

  const handleDeleteVoiceUrl = () => {
    setVoiceUrl(null);
    setIsVoiceChange(true);
  };

  return (
    <section className="admin-section">
      <h2 className={styles.title}>Редактировать сигнал</h2>
      <div className={styles.imgTitle}>Изображение сигнала</div>
      <div className={styles.imgWrapper}>
        {imageUrl && !isImgChange && (
          <div className={styles.imgLoaded}>
            <img src={imageUrl} width={180} height={104} alt="img" />
            <button className={styles.trashBtn} onClick={handleDeleteImg}>
              <img src={trash} alt="delete-img" />
            </button>
          </div>
        )}
        {isImgChange && imgForViev && (
          <div className={styles.imgLoaded}>
            <img src={imgForViev} width={180} height={104} alt="img" />
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
            accept=".jpeg, .jpg, .png"
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
          <AudioRecorder
            handleDeleteVoiceUrl={handleDeleteVoiceUrl}
            recorder={recorder(setVoiceLocal)}
          />
        </div>
      </div>
      {voiceUrl && (
        <div className={styles.voiceWrapper}>
          <WaveFormUrl audio={voiceUrl} uid={id} />
          <button className={styles.deleteVoice} onClick={handleDeleteVoice}>
            <img src={trash} alt="delete-voice" />
          </button>
        </div>
      )}
      {!voiceUrl && voiceLocal && (
        <div className={styles.voiceWrapper}>
          <WaveFormLocal audio={voiceLocal} />
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
          onChange={(e) => setHeader(e.target.value)}
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
          onChange={(e) => setDesk(e.target.value)}
          name="description"
          placeholder="Введите описание сигнала"></textarea>
      </div>
      <div className={styles.bottom}>
        <Link to={'/signals'} className={styles.bottomCancel}>
          Отмена
        </Link>
        <button className={styles.bottomAdd} onClick={() => saveSignal()}>
          Сохранить сигнал
        </button>
      </div>
    </section>
  );
};

export default AdminSignal;

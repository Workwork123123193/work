import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './signalItem.module.scss';
import Waveform from '../../../components/audio-player/Waveform';
import { getTimeInMoscowTimeZone } from '../utils/getTime';
import edit from '@assets/edit.svg';
import trash from '@assets/delete.svg';
import clock from '@assets/clock-violet.svg';
import { deleteSignal, getImg, getVoice } from '@service/admin/signals';

const SignalItem = ({ item, setIsDelete }) => {
  const [img, setImg] = useState(null);
  const [voiceUrl, setVoiceUrl] = useState(null);

  const handleDeleteItem = async (id) => {
    try {
      const response = await deleteSignal(id);
      //после успешного удаление перерисовываем страницу с обновленным массивом
      setIsDelete((prev) => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchImg = async () => {
      try {
        const { data } = await getImg(item.id);
        const blob = new Blob([data]);
        const url = URL.createObjectURL(blob);
        setImg(url);

      } catch (error) {
        console.log(error);
      }
    };

    fetchImg();

  }, [item.id]);


  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const { data } = await getVoice(item.id);
        const blob = new Blob([data]);
        var url = URL.createObjectURL(blob);
        console.log("audio:", data)
        setVoiceUrl(url);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAudio();
  }, [item.id]);

  return (
    <div key={item.id} className={styles.signal}>
      <div className={styles.imgWrapper}>
        {img ? <img src={img} width={180} height={114} alt="Image" /> : ''}
      </div>
      <div className={styles.voice}>
        <Waveform audio={voiceUrl} uid={item.id} />
      </div>
      <h3 className={styles.title}>{item.title}</h3>
      <div className={styles.desk}>{item.description}</div>
      <div className={styles.buttons}>
        <Link to={`/signal/${item.id}`}>
          <img src={edit} width={19} height={18} alt="edit" loading="lazy" />
        </Link>
        <button onClick={() => handleDeleteItem(item.id)}>
          <img src={trash} width={16} height={20} alt="delete" loading="lazy" />
        </button>
      </div>
      <div className={styles.date}>
        <img src={clock} width={16} height={15} alt="date" loading="lazy" />
        <span className={styles.time}>{getTimeInMoscowTimeZone(item.creationDate)}</span>
      </div>
    </div>
  );
};

export default SignalItem;

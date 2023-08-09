import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styles from './signalItem.module.scss';
import WaveformUrl from '../waveSurfer/WaveSurferUrl';
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
        const blob = new Blob([data], { type: 'image/jpeg' });
        const url = URL.createObjectURL(blob);

        setImg(url);

        //   var arrayBufferView = new Uint8Array(data);
        //   var blob = new Blob([arrayBufferView], { type: 'image/jpeg' });
        //   var urlCreator = window.URL || window.webkitURL;
        //   var imageUrl = urlCreator.createObjectURL(blob);
        //   console.log(imageUrl);
      } catch (error) {
        console.log(error);
      }
    };

    fetchImg();

    // const data = await getImg(item.id);
    // console.log(data);
    // const base64 = btoa(
    //   new Uint8Array(data)
    //     .reduce((data, byte) => data + String.fromCharCode(byte), '')
    // );
    // console.log(base64);
    // setImg(base64);

    // const blob = new Blob([data], { type: 'image/png' });
    // const asd = data:image/png;base64,${new Uint8Array(blob).toString('base64')};
    // const url = URL.createObjectURL(blob);

    // var binary = '';
    // var bytes = new Uint8Array(data);
    // console.log(bytes);
    // bytes.forEach((b) => (binary += String.fromCharCode(b)));
    // console.log(bytes);
    // const asd = window.btoa(binary);
    // console.log(asd);
    // setImg(asd);
  }, [item.id]);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const { data } = await getVoice(item.id);
        setVoiceUrl(data);
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
        <WaveformUrl voiceUrl={voiceUrl} />
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

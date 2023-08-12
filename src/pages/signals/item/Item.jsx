import { useState, useEffect } from 'react';
import Waveform from '../../../components/audio-player/Waveform';

import styles from './item.module.scss';
import logo from '@assets/logo.svg';
import { getImg, getVoice } from '@service/admin/signals';
import player from '@assets/player.svg';
import pause from '@assets/pause.svg';
import clock from '@assets/clock-violet.svg';

const Item = ({ title, creationDate, description, id }) => {
  const [img, setImg] = useState(null);
  const [voiceUrl, setVoiceUrl] = useState(null);

  useEffect(() => {
    const fetchImg = async () => {
      try {
        const { data } = await getImg(id);
        const blob = new Blob([data]);
        const url = URL.createObjectURL(blob);
        setImg(url);
      } catch (error) {
        console.log(error);
      }
    };

    fetchImg();
  }, [id]);

  useEffect(() => {
    const fetchAudio = async () => {
      try {
        const { data } = await getVoice(id);
        const blob = new Blob([data]);
        var url = URL.createObjectURL(blob);
        setVoiceUrl(url);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAudio();
  }, [id]);

  return (
    <div className={styles.item}>
      <div className={styles.logo}>
        <img src={logo} alt="CryptoLife" width={35} height={40} loading="lazy" />
        <div className={styles.logoRight}>
          <span className={styles.logoTop}>CryptoLife</span>
          <span className={styles.logoBottom}>крипто-сообщество</span>
        </div>
      </div>
      <div className={styles.imgWrapper}>
        <img src={img} alt="img" width={493} height={312} loading="lazy" />
      </div>
      <Waveform audio={voiceUrl} uid={id} />
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.desc}>{description}</div>
    </div>
  );
};

export default Item;

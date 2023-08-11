import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

import styles from './wafeSurfet.module.scss';
import play from '@assets/player.svg';
import pause from '@assets/pause.svg';

const formWaveSurferOptions = (ref) => ({
  container: ref,
  waveColor: '#D4DEE6',
  progressColor: '#6a1b9a',
  cursorColor: '#6a1b9a',
  cursorWidth: 4,
  barWidth: 5,
  barHeight: 1,
  barRadius: 10,
  barGap: 3,
  responsive: true,
  height: 24,
  normalize: true,
  partialRender: true,
});

function WaveformUrl({ voiceUrl }) {
  console.log(voiceUrl);
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);
  let type = URL.createObjectURL(new Blob([voiceUrl]));

  useEffect(() => {
    let options = formWaveSurferOptions(waveformRef.current);

    setPlay(false);

    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(type);

    wavesurfer.current.on('ready', function () {
      document.querySelector(`[data-uid='${type}']`).textContent = minFormat(
        wavesurfer.current.getDuration(),
      );
    });

    wavesurfer.current.on('audioprocess', function () {
      if (wavesurfer.current.isPlaying()) {
        let currentTime = wavesurfer.current.getCurrentTime();
        document.querySelector(`[data-uid='${type}']`).textContent = minFormat(currentTime);
      }
    });

    wavesurfer.current.on('click', function () {
      let currentTime = wavesurfer.current.getCurrentTime();
      document.querySelector(`[data-uid='${type}']`).textContent = minFormat(currentTime);
    });

    wavesurfer.current.on('finish', () => {
      setPlay((prev) => !prev);
    });

    return () => wavesurfer.current.destroy();
  }, [type, voiceUrl]);

  const minFormat = (sec) => {
    let m = ((sec % 3600) / 60).toFixed(0).toString().padStart(2, '0');
    let s = (sec % 60).toFixed(0).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handlePlayPause = () => {
    setPlay((prev) => !prev);
    wavesurfer.current.playPause();
  };

  return (
    <div className={styles.wave}>
      <button className={styles.btn} onClick={handlePlayPause}>
        <img src={!playing ? play : pause} width={59} height={59} alt="play" loading="lazy" />
      </button>
      <div className={styles.road}>
        <div className={styles.left} id="waveform" ref={waveformRef} />
        <div className={styles.right} data-uid={type}></div>
      </div>
    </div>
  );
}

export default WaveformUrl;

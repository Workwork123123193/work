import { useEffect, useRef, useState } from 'react';

import styles from './wafeSurfet.module.scss';
import WaveSurfer from 'wavesurfer.js';
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

export default function Waveform({ audio }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);

  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(audio?.size ? URL?.createObjectURL(audio) : audio);

    wavesurfer.current.on('ready', function () {
      document.querySelector(`[data-uid='${audio}']`).textContent = minFormat(
        wavesurfer.current.getDuration(),
      );
    });

    wavesurfer.current.on('audioprocess', function () {
      if (wavesurfer.current.isPlaying()) {
        var currentTime = wavesurfer.current.getCurrentTime();
        document.querySelector(`[data-uid='${audio}']`).textContent = minFormat(currentTime);
      }
    });

    wavesurfer.current.on('finish', () => {
      setPlay((prev) => !prev);
    });

    wavesurfer.current.on('click', function () {
      var currentTime = wavesurfer.current.getCurrentTime();
      document.querySelector(`[data-uid='${audio}']`).textContent = minFormat(currentTime);
    });

    return () => wavesurfer.current.destroy();
  }, [audio]);

  const minFormat = (sec) => {
    var m = ((sec % 3600) / 60).toFixed(0).toString().padStart(2, '0');
    var s = (sec % 60).toFixed(0).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  return (
    <div className={styles.wave}>
      <button className={styles.btn} onClick={handlePlayPause}>
        <img src={!playing ? play : pause} width={59} height={59} alt="play" loading="lazy" />
      </button>
      <div className={styles.road}>
        <div className={styles.left} id="waveform" ref={waveformRef} />
        <div className={styles.right} data-uid={audio}></div>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from 'react';

import styles from '../../styles.module.scss';
import WaveSurfer from 'wavesurfer.js';
import playerSvg from '@assets/player.svg';
import pauseSvg from '@assets/pause.svg';

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

export default function Waveform({ audio, uid }) {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [playing, setPlay] = useState(false);

  useEffect(() => {
    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current);
    wavesurfer.current = WaveSurfer.create(options);
    wavesurfer.current.load(audio);

    wavesurfer.current.on('ready', function () {
      document.querySelector(`[data-uid='${uid}']`).textContent = minFormat(
        wavesurfer.current.getDuration(),
      );
    });

    wavesurfer.current.on('audioprocess', function () {
      if (wavesurfer.current.isPlaying()) {
        var currentTime = wavesurfer.current.getCurrentTime();
        document.querySelector(`[data-uid='${uid}']`).textContent = minFormat(currentTime);
      }
    });

    wavesurfer.current.on('finish', () => {
      setPlay((prev) => !prev);
    });

    wavesurfer.current.on('click', function () {
      var currentTime = wavesurfer.current.getCurrentTime();
      document.querySelector(`[data-uid='${uid}']`).textContent = minFormat(currentTime);
    });

    return () => wavesurfer.current.destroy();
  }, [audio, uid]);

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
    <>
      <div className={styles.bAudio}>
        <img
          className={styles.bIcon}
          src={playing ? pauseSvg : playerSvg}
          onClick={handlePlayPause}
          alt="player"
        />
        <div className={`${styles.bCol} ${styles.bCol_v2}`}>
          <div id={styles.waveform} ref={waveformRef} />
          <div className={`${styles.bText} ${styles.bText_g}`} data-uid={`${uid}`}></div>
        </div>
      </div>
    </>
  );
}

import { useEffect, useRef, useState, useCallback } from 'react';

import styles from './voice.module.scss';
import micro from '@assets/micro.svg';
import pause from '@assets/pause.svg';

const Counter = (props) => {
  const [renderedStreamDuration, setRenderedStreamDuration] = useState('00:00:00');
  const streamDuration = useRef(0);
  const previousTime = useRef(0);
  const requestAnimationFrameId = useRef(null);
  const [isStartTimer, setIsStartTimer] = useState(false);
  const [isStopTimer, setIsStopTimer] = useState(false);

  const updateTimer = useCallback(() => {
    let now = performance.now();
    let dt = now - previousTime.current;

    if (dt >= 1000) {
      streamDuration.current = streamDuration.current + Math.round(dt / 1000);
      const formattedStreamDuration = new Date(streamDuration.current * 1000)
        .toISOString()
        .substr(11, 8);
      setRenderedStreamDuration(formattedStreamDuration);
      previousTime.current = now;
    }
    requestAnimationFrameId.current = requestAnimationFrame(updateTimer);
  }, []);

  const startTimer = useCallback(() => {
    previousTime.current = performance.now();
    requestAnimationFrameId.current = requestAnimationFrame(updateTimer);
  }, [updateTimer]);

  useEffect(() => {
    if (props.record === true) {
      startHandler();
    } else {
      stopHandler();
    }
    if (isStartTimer && !isStopTimer) {
      startTimer();
    }
    if (isStopTimer && !isStartTimer) {
      streamDuration.current = 0;
      cancelAnimationFrame(requestAnimationFrameId.current);
      setRenderedStreamDuration('00:00:00');
    }
  }, [isStartTimer, isStopTimer, startTimer, props.record]);

  const startHandler = () => {
    setIsStartTimer(true);
    setIsStopTimer(false);
  };

  const stopHandler = () => {
    setIsStopTimer(true);
    setIsStartTimer(false);
  };

  return <div>{renderedStreamDuration}</div>;
};

function AudioRecorder({ recorder, handleDeleteVoiceUrl }) {
  const [record, setRecord] = useState(false);
  let [isRecording, startRecording, stopRecording] = recorder;

  function Buttonstart() {
    setRecord(true);
    startRecording();
  }

  async function Buttonstop() {
    if (isRecording === true) {
      await stopRecording();
      setRecord(false);
    }
  }

  const handleRecording = () => {
    Buttonstart();
    setTimeout(() => Buttonstop(), 150);

    if (handleDeleteVoiceUrl) {
      handleDeleteVoiceUrl();
    }
  };

  return (
    <>
      {!record ? (
        <button className={styles.record} onClick={handleRecording}>
          <img src={micro} width={14} height={20} alt="microphone" />
          <span>Записать голосовое сообщение</span>
        </button>
      ) : (
        <>
          <button className={styles.pause} onClick={handleRecording}>
            <img src={pause} width={50} height={50} alt="pause" />
            <span>
              Запись: <Counter record={record} />
            </span>
          </button>
        </>
      )}
    </>
  );
}
export default AudioRecorder;

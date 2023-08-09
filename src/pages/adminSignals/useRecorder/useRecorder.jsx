import { useState, useEffect } from 'react';

const useRecorder = (setVoiceUrl) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);

  useEffect(() => {
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    const handleData = (e) => {
      setVoiceUrl(e.data);
    };

    recorder.addEventListener('dataavailable', handleData);

    return () => recorder.removeEventListener('dataavailable', handleData);
  }, [recorder, isRecording, setVoiceUrl]);

  const startRecording = () => {
    setIsRecording(true);
  };
  const stopRecording = () => {
    setIsRecording(false);
  };
  return [isRecording, startRecording, stopRecording];
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream, { type: 'audio/mp3' });
}

export default useRecorder;

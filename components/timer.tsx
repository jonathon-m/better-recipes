import { useEffect, useState } from 'react';
import { Play, Pause } from 'react-feather';

export default function TimerButton(props: { duration: number }) {
  let [countDown, setCountDown] = useState(props.duration);
  let [displayTime, setDisplayTime] = useState(toDisplayTime(countDown));
  let [started, setStarted] = useState(false);
  let [paused, setPaused] = useState(false);
  let [ended, setEnded] = useState(false);

  useEffect(() => {
    if (ended) {
      if (paused) {
        pauseAudio();
      } else {
        playAudio();
      }
    }
  }, [ended, paused]);

  useEffect(() => {
    let interval: any = null;
    if (started) {
      interval = setInterval(() => {
        if (!paused) {
          if (countDown > 0) {
            setCountDown(countDown - 1);
            setDisplayTime(toDisplayTime(countDown));
          } else {
            setEnded(true);
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countDown, started, paused]);

  const start = () => {
    setStarted(true);
  };

  const togglePause = () => {
    setPaused(!paused);
  };

  const addMinute = () => {
    setCountDown(countDown + 60);
    setEnded(false);
    setDisplayTime(toDisplayTime(countDown + 60));
  };

  const playAudio = () => {
    const audioEl: HTMLAudioElement = document.getElementsByClassName(
      'audio-element'
    )[0] as HTMLAudioElement;
    audioEl.play();
  };
  const pauseAudio = () => {
    const audioEl: HTMLAudioElement = document.getElementsByClassName(
      'audio-element'
    )[0] as HTMLAudioElement;
    audioEl.pause();
  };

  return (
    <>
      <h2 className='text-2xl font-bold py-2 inline-block'>{displayTime}</h2>
      <button
        className='bg-better-blue hover:bg-blue-500 text-white font-bold py-2 px-4 mx-2 rounded-full'
        onClick={togglePause}
      >
        {paused ? (
          <Play className='inline-block' />
        ) : (
          <Pause className='inline-block' />
        )}
      </button>
      <button
        className='bg-better-blue hover:bg-blue-500 text-white font-bold py-2 px-4 mx-2 rounded-full'
        onClick={addMinute}
      >
        + 1 min
      </button>

      <audio className='audio-element'>
        <source src='/audio/alarm-andy.mp3'></source>
      </audio>
    </>
  );
}

const padTime = (n: number) => {
  const sn = n.toString();
  return sn.length === 1 ? `0${sn}` : sn;
};

const toDisplayTime = (distance: number) => {
  const hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
  const minutes = padTime(Math.floor((distance % (60 * 60)) / 60));
  const seconds = padTime(Math.floor(distance % 60));
  if (hours > 0) {
    return `${padTime(hours)}:${minutes}:${seconds}`;
  } else return `${minutes}:${seconds}`;
};

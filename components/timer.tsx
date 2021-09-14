import { useEffect, useState, MouseEvent } from 'react';
import { Play, Pause, Clock } from 'react-feather';

export default function TimerButton(props: { duration: number }) {
  let [countDown, setCountDown] = useState(props.duration);
  let [displayTime, setDisplayTime] = useState(toDisplayTime(countDown));
  let [paused, setPaused] = useState(true);
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
    if (!paused) {
      interval = setInterval(() => {
        if (countDown > 0) {
          setCountDown(countDown - 1);
          setDisplayTime(toDisplayTime(countDown));
        } else {
          setEnded(true);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [countDown, paused]);

  const togglePause = (e: MouseEvent) => {
    e.stopPropagation();
    setPaused(!paused);
  };

  const addMinute = (e: MouseEvent) => {
    e.stopPropagation();
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
    <div
      onClick={(e: MouseEvent) => e.stopPropagation()}
      className='text-base bg-transparent rounded-br-lg grid grid-cols-8 grid-rows-1 gap-0 text-white text-center'
    >
      <h2 className='bg-better-blue rounded-tl-full text-2xl font-bold p-2 inline-block col-span-4 pl-4'>
        <Clock className='inline-block mr-2' />
        {displayTime}
      </h2>
      <button
        className='bg-better-blue hover:bg-blue-500 font-bold col-span-2'
        onClick={togglePause}
      >
        {paused ? (
          <Play className='inline-block' />
        ) : (
          <Pause className='inline-block' />
        )}
      </button>
      <button
        className='bg-better-blue hover:bg-blue-500 font-bold col-span-2 rounded-br-lg px-4'
        onClick={addMinute}
      >
        + 1 min
      </button>

      <audio className='audio-element'>
        <source src='/audio/alarm-andy.mp3'></source>
      </audio>
    </div>
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

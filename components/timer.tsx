import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function TimerButton(props: { duration: number }) {

    let [countDown, setCountDown] = useState(props.duration);
    let [displayTime, setDisplayTime] = useState(toDisplayTime(countDown))
    let [started, setStarted] = useState(false);
    let [paused, setPaused] = useState(false);
    let [ended, setEnded] = useState(false);

    useEffect(() => {
        if (ended) {
            if (paused) {
                pauseAudio()
            } else {
                playAudio()
            }  
        }
    }, [ended, paused])

    useEffect(() => {
        let interval: any = null;
        if (started) {
            interval = setInterval( 
                () => {
                    if (!paused) {
                        if (countDown > 0) {
                            setCountDown(countDown-1)
                            setDisplayTime(toDisplayTime(countDown))
                        } else {
                            setEnded(true)
                        }
                    }
                }, 
                1000 )
        }
        return () => clearInterval(interval);
    }, [countDown, started, paused]);

    const start = () => {
        setStarted(true);
    }

    const togglePause = () => {
        setPaused(!paused)
    }

    const addMinute = () => {
        setCountDown(countDown+60)
        setEnded(false)
        setDisplayTime(toDisplayTime(countDown+60))
    }

    const playAudio = () => {
        const audioEl: HTMLAudioElement = document.getElementsByClassName("audio-element")[0] as HTMLAudioElement
        audioEl.play()
      }
    const pauseAudio = () => {
        const audioEl: HTMLAudioElement = document.getElementsByClassName("audio-element")[0] as HTMLAudioElement
        audioEl.pause()
    }
    
    
    return <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="p-4 rounded-lg w-full h-full grid grid-cols-8 gap-y-4 text-center rounded-lg ring-2 ring-green-400 place-content-center">
        { started ? 
            <>
                <div className="col-span-5">
                    <h2 className="text-3xl font-bold py-2">
                        {displayTime}
                    </h2>
                </div>
                <div  className="col-span-3 p-2 ">
                    <button 
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded-full" 
                    onClick={togglePause}>
                        {paused ? 'Start' : 'Pause'}
                    </button>
                    <button 
                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 mx-2 rounded-full" 
                    onClick={addMinute}>
                        + 1 min
                    </button>
                </div>
            </>
            : 
            <div className="col-span-8">
                <button 
                className="p-2 bg-green-600 hover:bg-green-700 text-white font-bold py-1 my-1 md:py-2 md:px-4 rounded-full" 
                onClick={start}>
                    Start timer
                </button>
            </div>
        }
        
        <audio className="audio-element">
          <source src="/audio/alarm-andy.mp3"></source>
        </audio>
    </motion.div>
}

const padTime = (n: number) => {
    const sn = n.toString();
    return sn.length === 1 ? `0${sn}` : sn
}

const toDisplayTime = (distance: number) => {
    const hours = Math.floor((distance % (60 * 60 * 24)) / (60 * 60));
    const minutes = padTime(Math.floor((distance % (60 * 60)) / 60));
    const seconds = padTime(Math.floor(distance % 60));
    if (hours > 0) {
        return `${padTime(hours)}:${minutes}:${seconds}`
    } else return `${minutes}:${seconds}`
}
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function TimerButton(props: { duration: number }) {

    let [countDown, setCountDown] = useState(props.duration);
    let [started, setStarted] = useState(false);

    useEffect(() => {
        let interval: any = null;
        if (started) {
            interval = setInterval( 
                () => {
                    setCountDown(countDown-1)
                }, 
                1000 )
        }
        return () => clearInterval(interval);
    }, [countDown, started]);

    const start = () => {
        setStarted(true);
    }


    return <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.3 }}
    className="p-8 md:p-12 bg-red rounded-lg w-full h-full">
        {countDown && started ? <span>{countDown}</span> : <button onClick={start}>Start timer</button>}
    </motion.div>
  }
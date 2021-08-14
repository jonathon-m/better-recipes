import { motion, PanInfo } from "framer-motion";
import { useState } from "react";
import { Instruction } from "../models/instruction";
import { Step } from "../models/step";

import InstructionCard from "./instruction";

export default function StepContainer(props: { step: Step, prev: () => void, next: () => void }) {

    const swipeThreshold = 100

    const [xPan, setXPan] = useState(0)
    const [rotate, setRotate] = useState(0)
    const [opacity, setOpacity] = useState(1)
    const [xStart, setXStart] = useState(0)

    function onPan(event: any, info: PanInfo) {
        const diff = info.point.x - xStart
        if (Math.abs(diff) < swipeThreshold) {
            setXPan(diff)
            setRotate(diff/20)
            setOpacity(1 - Math.abs(diff)/swipeThreshold)
        }
    }
   
    function onPanStart(event: any, info: PanInfo) {
        setXStart(info.point.x);
    }

    function onPanEnd(event: any, info: PanInfo) {
        const diff = info.point.x - xStart
        if (diff > swipeThreshold) {
            props.prev()
        } else if (diff < -swipeThreshold) {
            props.next()
        } else {
            setXPan(0)
            setRotate(0)
            setOpacity(1)
        }
       
    }
    
  return (
    <>
      <motion.div
        onPan={onPan}
        onPanEnd={onPanEnd}
        onPanStart={onPanStart}
        initial={{ opacity: 0 }}
        animate={{ opacity, x: xPan, rotate }}
        transition={{ bounce: 0, ease: 0 }}
        className="p-6 md:p-8 md:p-12 bg-white rounded-lg ring-2 ring-green-400 w-full h-full"
      >
        {props.step.instructions.map((instruction: Instruction) => (
          <InstructionCard key={instruction.id} instruction={instruction}/>
        ))}

      </motion.div>
    </>
  );
}

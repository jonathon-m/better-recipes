import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Step } from "../models/step";
import { RootState } from "../store/store";

export default function Stepper(props: { steps: Step[] }) {
  const stepIndex = useSelector((state: RootState) => state.progress.stepIndex);

  return (
    <>
      <div className="w-full">
        <div className="flex">
          { props.steps.map(s => (
            <div key={'stepper'+s.index} className="w-1/4">
                {!!s.index && <div className="relative">
                    <div className="absolute flex align-center items-center align-middle content-center mt-5 hidden md:block"
                     style={{ width: 'calc(100% - 2.5rem - 1rem)', top: '50%', transform: 'translate(-50%, -50%)'}}>
                    <div className="w-full bg-gray-200 rounded items-center align-middle align-center flex-1">
                        <motion.div layout className={"bg-green-600 py-1 rounded w-full " + ((s.index <= stepIndex) ? 'w-full' : 'w-0')}></motion.div>
                    </div>
                    </div>
                </div>}
                <div className="relative">
                    <motion.div layout  className={"w-5 h-5 md:w-10 md:h-10 mx-auto rounded-full text-sm md:text-lg text-white flex items-center ring-2 ring-green-600 " + ((s.index <= stepIndex) ? 'bg-green-600' : 'ring') }>
                        <span className={"text-center w-full " + ((s.index <= stepIndex) ? 'text-white' : 'text-green-600')}>
                            {s.index}
                        </span>
                    </motion.div>
                </div>

                {/* <div className="text-xs text-center md:text-base">
                Select Server
                </div> */}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

import { Instruction } from "../models/instruction";
import TimerButton from "./timer";

export default function InstructionCard(props: { instruction: Instruction} ) {

    return   <>
    <div>
        <h2 className="text-gray-800 text-xl md:text-3xl font-semibold">
        {props.instruction.labels[0] || ""}
        </h2>
        <p className="mt-2 text-gray-600">{props.instruction.text}</p>
        <TimerButton duration={props.instruction.duration}/>
    </div>
    <div className="flex justify-end mt-4">
        <a href="#" className="text-l md:text-xl font-medium text-indigo-500">
        Ingredients: { props.instruction.ingredients.join(', ')}
        </a>
    </div>
    </>
  
  }

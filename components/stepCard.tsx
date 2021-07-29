import { Instruction } from "../models/instruction"
import { Step } from "../models/step"

export default function StepCard(props: { step: Step} ) {

  return <>
    {
        props.step.instructions.map((instruction: Instruction) => {
            return(
        <div key={instruction.id} className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-20">
        <div>
            <h2 className="text-gray-800 text-3xl font-semibold">{instruction.labels[0] || ''}</h2>
            <p className="mt-2 text-gray-600">{instruction.text}</p>
        </div>
        <div className="flex justify-end mt-4">
            <a href="#" className="text-xl font-medium text-indigo-500">Ingredients:</a>
        </div>
        </div>)
    })
    }
</>

}
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import { Recipe } from "../models/recipe"
import { RootState } from "../store/store"
import { nextStep, prevStep } from "../store/features/progress/progressSlice";
import Stepper from "./stepper";

export default function RecipeProgress(props: { recipe: Recipe } ) {

const progress = useSelector((state: RootState) => state.progress);

const dispatch = useDispatch();

const back = () => {
    dispatch(prevStep())
}
const next = () => {
    dispatch(nextStep())
}

  return <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="p-2 self-end md:self-auto md:p-8 bg-white rounded-lg ring-2 ring-green-400 w-full h-3/4 md:h-full grid grid-rows-1 grid-cols-6">

            <button 
                className="col-span-1 bg-green-600 hover:bg-green-700 text-white font-bold py-1 my-1 md:py-2 md:px-4 rounded-full"
                onClick={back}>
                    Back
            </button>

            <div className="col-span-4 py-3 md:py-2 text-lg text-center">
                <Stepper steps={props.recipe.steps}/>
            </div>
            
            <button 
                className="col-span-1 bg-green-600 hover:bg-green-700 text-white font-bold py-1 my-1 md:py-2 md:px-4 rounded-full"
                onClick={next}>
                    Next
            </button>
        </motion.div>

}
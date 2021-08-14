import { recipeApi, useGetRecipeByUrlQuery } from "../middleware/recipeAPI";
import { Instruction } from "../models/instruction";
import TimerButton from "./timer";


import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import IngredientIcon from "./ingredientIcon";

export default function InstructionCard(props: { instruction: Instruction} ) {
    const url = useSelector((state: RootState) => state.progress.url)
    const { data } = useGetRecipeByUrlQuery(url)

    return  <>
    <div className="grid grid-cols-6 grid-rows-4 h-full">
        <div className=" row-span-3 col-span-6">
            <h2 className="text-gray-800 text-xl md:text-3xl font-semibold w-full capitalize">
            {props.instruction.labels[0] || ""}
            </h2>
            <p className="mt-2 text-gray-600">{props.instruction.text}</p>
            { data && props.instruction.ingredients.map((ing, i) => (
                
                <IngredientIcon key={ing+i} ingredient={data.ingredients.find((i) => i.id === ing)}/>
            )
            )           
        }
        </div>

 
       

        { props.instruction.duration > 0 && 
        <div className="col-span-6">

            <TimerButton 
            
            duration={props.instruction.duration}/>
            </div> }
        </div>
    </>
  
  }

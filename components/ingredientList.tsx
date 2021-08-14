import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Ingredient } from "../models/ingredient";
import { Step } from "../models/step";
import { RootState } from "../store/store";
import IngredientRow from "./ingredientRow";

export default function IngredientList(props: { ingredients: Ingredient[], step: Step }) {

  const { ingredientsCurrent, ingredientsUsed } = useSelector((state: RootState) => state.progress)
  
  return <motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.3 }}
  className="p-8 md:p-12 bg-white rounded-lg ring-2 ring-green-400 w-full h-full divide-y-2 divide-green-600 divide-dashed overflow-y-auto ">
      { props.ingredients.map((ing, i) => 
      <div className={ingredientsCurrent.includes(ing.id) ? 'py-2' : 'hidden md:block py-2'} key={ing.id+i} >
        <IngredientRow 
          ingredient={ing} 
          isCurrent={ingredientsCurrent.includes(ing.id)}
          isUsed={ingredientsUsed.includes(ing.id)}/>
        </div>)}

  </motion.div>
}

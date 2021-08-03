import { motion } from "framer-motion";
import { Ingredient } from "../models/ingredient";
import { Step } from "../models/step";
import IngredientRow from "./ingredientRow";

export default function IngredientList(props: { ingredients: Ingredient[], step: Step }) {
  return <motion.div 
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.3 }}
  className="p-8 md:p-12 bg-white rounded-lg ring-2 ring-green-400  w-full h-full">
      { props.ingredients.map(ing => <IngredientRow key={ing.id} ingredient={ing} />)}
  </motion.div>
}

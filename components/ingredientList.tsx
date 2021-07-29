import { motion } from "framer-motion";
import { Ingredient } from "../models/ingredient";
import IngredientRow from "./ingredientRow";

export default function IngredientList(props: { ingredients: Ingredient[] }) {
  return (
    <>
    <motion.div 
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
        className="max-w-md py-12 px-12 bg-white sm:rounded-lg ring-2 ring-green-400">
      {props.ingredients.map((ingredient: Ingredient) => {
        return (
          <IngredientRow
            key={ingredient.id}
            ingredient={ingredient}
          ></IngredientRow>
        );
      })}
    </motion.div>   
    </>
  );
}

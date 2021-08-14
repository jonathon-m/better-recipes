import { motion } from "framer-motion"
import React from "react"
import { useDispatch } from "react-redux"
import { Ingredient } from "../models/ingredient"
import { Recipe } from "../models/recipe"
import { startRecipe } from "../store/features/progress/progressSlice"
import { AppDispatch } from "../store/store"
import IngredientCrossable from "./ingredientCrossable"


export default function RecipeSummary(props: { recipe: Recipe } ) {

const dispatch: AppDispatch = useDispatch()

const start = () => {
    dispatch(startRecipe())
}

  return <motion.div 
            initial={{ x: '-25%', y: '-50%', opacity: 0}}
            animate={{ x: '-50%', opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-11/12 md:w-1/2 max-w-md py-12 px-12 bg-white rounded-lg ring-2 ring-green-400 absolute top-1/2 left-1/2">
            <div className="flex justify-center md:justify-end -mt-20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                alt="Result of recipe"
                className="w-20 h-20 object-cover rounded-full border-2 border-green-600" 
                src={props.recipe.image}/>
            </div>
            <div className="py-2 text-xl">
                <h1>{props.recipe.name}</h1>
            </div>
            <div className="py-2">
            {props.recipe.ingredients.map((ingredient: Ingredient) => (
                <IngredientCrossable key={ingredient.id} ingredient={ingredient}></IngredientCrossable>))
            }
            </div>
            <div className="py-4 grid grid-cols-3 grid-rows-1 place-items-center text-gray-500">
                <p>{props.recipe.servings} serves</p>
                <p>{props.recipe.steps.length} steps</p>
                <p>{props.recipe.time.total}</p>
            </div>
            <div className="pt-4 text-center">
                <button 
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={start}>
                    Start cooking!
                </button>
            </div>
    </motion.div>


}
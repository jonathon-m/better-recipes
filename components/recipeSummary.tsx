import { motion } from 'framer-motion';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Ingredient } from '../models/ingredient';
import { Recipe } from '../models/recipe';
import { startRecipe } from '../store/features/progress/progressSlice';
import { AppDispatch } from '../store/store';
import BorderBox from './borderBox';
import IngredientCrossable from './ingredientCrossable';
import RecipeMeta from './recipeMeta';

export default function RecipeSummary(props: { recipe: Recipe }) {
  const dispatch: AppDispatch = useDispatch();

  const start = () => {
    dispatch(startRecipe());
  };

  return (
    <BorderBox
      initial={{ x: '-25%', y: '-50%', opacity: 0 }}
      animate={{ x: '-50%', opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0 }}
      className='w-full h-8/10 md:w-1/2 max-w-md absolute top-1/2 left-1/2 -m-px rounded-none sm:rounded-lg'
    >
      <div className='flex justify-center md:justify-end -mt-12'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt='Result of recipe'
          className='w-20 h-20 object-cover rounded-full border-2 border-green-600'
          src={props.recipe.image}
        />
      </div>
      <div className='py-2 text-xl'>
        <h1>{props.recipe.name}</h1>
      </div>
      <div className='py-2'>
        {props.recipe.ingredients.map((ingredient: Ingredient) => (
          <IngredientCrossable key={ingredient.id} ingredient={ingredient} />
        ))}
      </div>

      <RecipeMeta {...props} />
      <div className='pt-4 text-center'>
        <button
          className='bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full'
          onClick={start}
        >
          Start cooking!
        </button>
      </div>
    </BorderBox>
  );
}

import { AnimatePresence, AnimateSharedLayout, motion } from 'framer-motion';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Recipe } from '../models/recipe';

import { RootState } from '../store/store';
import Header from './header';
import IngredientList from './ingredientList';
import InstructionCard from './instruction';
import RecipeComplete from './recipeComplete';

export default function RecipeContainer(props: { recipe: Recipe }) {
  const { instructionsCompleted, url } = useSelector(
    (state: RootState) => state.progress
  );
  return (
    <AnimateSharedLayout type='crossfade'>
      <div className='w-full h-full grid grid-cols-6 grid-rows-10 md:grid-rows-6 gap-0 md:gap-y-4 md:grid-rows-6'>
        <div className='col-span-6 order-first md:col-span-2'>
          <Header recipeName={props.recipe.name} url={url} />
        </div>

        <div className='hidden md:block md:row-start-2 md:order-1 md:col-span-2 md:row-span-5 h-full'>
          <IngredientList {...props} />
        </div>

        <div className='row-start-2 row-span-5 col-span-6 order-1 md:row-start-0 md:order-2 md:col-span-4 md:row-span-6 overflow-y-auto overscroll-y-auto scrollbar-hide'>
          {props.recipe.instructions.map((inst, i) => (
            <InstructionCard
              key={i}
              currentIndex={i}
              instruction={inst}
              show={!instructionsCompleted.includes(inst.id)}
            />
          ))}
          {props.recipe.instructions.length ===
            instructionsCompleted.length && <RecipeComplete />}
        </div>
      </div>
    </AnimateSharedLayout>
  );
}

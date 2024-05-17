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
  const { instructionsCompleted } = useSelector(
    (state: RootState) => state.progress
  );
  return (
    <AnimateSharedLayout type='crossfade'>
      <div className='w-full h-full grid grid-cols-6 grid-rows-8 gap-0 md:gap-y-4 auto-rows-min md:text-lg'>
        <div className='absolute w-full top-0 left-0 md:relative md:col-span-2 flex items-end'>
          <Header recipeName={props.recipe.name} />
        </div>

        <div className='hidden md:block md:row-start-2 md:order-1 md:col-span-2 md:row-span-7 -mt-8'>
          <IngredientList {...props} />
        </div>

        <div className='md:pt-10 row-span-8 col-span-6 order-1 md:order-2 md:col-span-4 overflow-y-auto overscroll-y-auto scrollbar-hide'>
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

import { AnimatePresence, motion } from 'framer-motion';
import { recipeApi, useGetRecipeByUrlQuery } from '../middleware/recipeAPI';
import { Instruction } from '../models/instruction';
import TimerButton from './timer';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import IngredientIcon from './ingredientIcon';
import BorderBox from './borderBox';
import React from 'react';
import { Smile } from 'react-feather';

export default function RecipeComplete() {
  return (
    <AnimatePresence>
      <BorderBox
        className='mb-2 md:mb-4 md:mr-4 first:mt-4 text-center'
        exit={{
          opacity: 0,
          height: 0,
          'padding-top': 0,
          'padding-bottom': 0,
        }}
        transition={{ opacity: { delay: 0 } }}
      >
        <h1 className='text-xl'>Congratulations!</h1>
        <p>
          Thanks for using Better Recipes.{' '}
          <Smile className='inline-block pl-1' />
        </p>
      </BorderBox>
    </AnimatePresence>
  );
}

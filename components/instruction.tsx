import { AnimatePresence, motion } from 'framer-motion';
import { useGetRecipeByUrlQuery } from '../middleware/recipeAPI';
import { Instruction } from '../models/instruction';
import TimerButton from './timer';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import IngredientIcon from './ingredientIcon';
import BorderBox from './borderBox';
import { completeInstruction } from '../store/features/progress/progressSlice';
import React, { useState } from 'react';
import { Check } from 'react-feather';

export default function InstructionCard(props: {
  instruction: Instruction;
  currentIndex: number;
  show: boolean;
}) {
  const dispatch: AppDispatch = useDispatch();
  const { url, instructionsCompleted } = useSelector(
    (state: RootState) => state.progress
  );
  const { data } = useGetRecipeByUrlQuery(url);
  const [showDone, setShowDone] = useState(false);

  const complete = () => {
    dispatch(completeInstruction(props.instruction.id));
  };

  return (
    <AnimatePresence>
      {props.show && (
        <BorderBox
          className='mb-2 md:mb-4 md:mr-4 first:mt-4 first:block'
          exit={{
            opacity: 0,
            height: 0,
            'padding-top': 0,
            'padding-bottom': 0,
          }}
          transition={{ opacity: { delay: 0 } }}
        >
          <div className='grid grid-cols-6 grid-rows-1'>
            <div className=' row-span-1 col-span-5'>
              <h2 className='text-gray-800 text-xl md:text-3xl font-semibold w-full capitalize'>
                {props.instruction.labels[0] || ''}
              </h2>
              <p className='mt-2 text-gray-600'>{props.instruction.text}</p>
              {data &&
                props.instruction.ingredients.map((ing, i) => (
                  <IngredientIcon
                    key={ing + i}
                    ingredient={data.ingredients.find((i) => i.id === ing)}
                  />
                ))}
            </div>
            <div className='col-span-1 text-right'>
              {props.currentIndex - instructionsCompleted.length === 0 && (
                <button
                  className='text-center bg-better-blue hover:bg-better-green text-white font-bold py-2 px-4 rounded-full'
                  onClick={complete}
                  onMouseEnter={() => setShowDone(true)}
                  onMouseLeave={() => setShowDone(false)}
                >
                  {showDone ? (
                    <span className='pl-3 pr-2'>
                      Done
                      <Check className='inline-block pl-1' />
                    </span>
                  ) : (
                    <>In Progress</>
                  )}
                </button>
              )}
            </div>

            {props.instruction.duration > 0 && (
              <div className='col-span-6 text-right'>
                <TimerButton duration={props.instruction.duration} />
              </div>
            )}
          </div>
        </BorderBox>
      )}
    </AnimatePresence>
  );
}

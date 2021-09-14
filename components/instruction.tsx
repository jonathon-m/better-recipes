import { AnimatePresence, motion } from 'framer-motion';
import { useGetRecipeByUrlQuery } from '../middleware/recipeAPI';
import { Instruction } from '../models/instruction';
import TimerButton from './timer';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import IngredientIcon from './ingredientIcon';
import BorderBox from './borderBox';
import { completeInstruction } from '../store/features/progress/progressSlice';
import React, { useEffect, useRef, useState } from 'react';
import IngredientRow from './ingredientRow';

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
  const [isCurrent, setIsCurrent] = useState(
    props.currentIndex - instructionsCompleted.length === 0
  );
  const isCheckedRef = useRef<boolean>();
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    setIsCurrent(props.currentIndex - instructionsCompleted.length === 0);
    isCheckedRef.current = isChecked;
    setTimeout(() => {
      if (isCheckedRef.current) {
        dispatch(completeInstruction(props.instruction.id));
        setIsChecked(false);
      }
    }, 500);
  }, [
    props.currentIndex,
    instructionsCompleted.length,
    isChecked,
    props.instruction.id,
    dispatch,
  ]);

  const handleOnChange = () => {
    if (isCurrent) {
      setIsChecked(!isChecked);
    }
  };

  return (
    <AnimatePresence>
      {props.show && (
        <BorderBox
          onClick={handleOnChange}
          className='select-none p-0 md:p-0 mb-2 md:mb-4 md:mr-4 md:ml-0 last:mb-20 first:mt-20 md:first:mt-4 first:block'
          exit={{
            opacity: 0,
            height: 0,
            'padding-top': 0,
            'padding-bottom': 0,
          }}
          transition={{ opacity: { delay: 0 } }}
        >
          <div
            className={
              'relative p-6 md:p-8' +
              (props.instruction.duration > 0 ? ' pb-20 md:pb-20' : '')
            }
          >
            <div className='grid grid-cols-12 grid-rows-1'>
              <div className='col-span-1'>
                {isCurrent && (
                  <input
                    type='checkbox'
                    className='rounded-full mt-1 checked:bg-better-blue checked:border-transparent w-6 h-6'
                    checked={isChecked}
                    onChange={handleOnChange}
                  ></input>
                )}
              </div>
              <div className='col-span-9'>
                <h2 className='text-gray-800 text-xl md:text-3xl font-semibold w-full capitalize'>
                  {props.instruction.labels[0] || ''}
                </h2>
                <p className='my-2 text-gray-600'>{props.instruction.text}</p>
                <div className='md:hidden'>
                  {data &&
                    props.instruction.ingredients.map((ing, i) => (
                      <IngredientRow
                        ingredient={data.ingredients.find((i) => i.id === ing)}
                        key={i}
                      />
                      // <IngredientIcon
                      //   key={ing + i}
                      //   ingredient={}
                      // />
                    ))}
                </div>
              </div>
              {/* <div className='col-span-2 text-right'>
                {isCurrent && <span className='pl-3 pr-2'>In Progress</span>}
              </div> */}
            </div>
            {props.instruction.duration > 0 && (
              <div className='w-3/4 md:w-1/2 lg:w-1/3 absolute bottom-0 right-0'>
                <TimerButton duration={props.instruction.duration} />
              </div>
            )}
          </div>
        </BorderBox>
      )}
    </AnimatePresence>
  );
}

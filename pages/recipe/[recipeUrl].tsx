/* eslint-disable @next/next/no-img-element */
import { useGetRecipeByUrlQuery } from '../../middleware/recipeAPI';
import { useRouter } from 'next/router';
import { skipToken } from '@reduxjs/toolkit/dist/query/react';
import Image from 'next/image';

import RecipeSummary from '../../components/recipeSummary';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { AnimatePresence } from 'framer-motion';
import RecipeContainer from '../../components/recipeContainer';
import RecipeLoading from '../../components/recipeLoading';
import RecipeError from '../../components/recipeError';
import { setUrl } from '../../store/features/progress/progressSlice';
import { Toaster } from 'react-hot-toast';
import SettingsMenu from '../../components/settingsMenu';
import { MouseEvent, useState } from 'react';

export default function RecipePage() {
  const router = useRouter();
  const { recipeUrl } = router.query;
  const encodedUrl = encodeURIComponent(recipeUrl as string);

  const dispatch = useDispatch();
  dispatch(setUrl(encodedUrl));

  const { data, error, isLoading, isUninitialized } = useGetRecipeByUrlQuery(
    encodedUrl ? encodedUrl : skipToken
  );

  const started = useSelector((state: RootState) => state.progress.started);

  // const [foodBadges, setFoodBadges] = useState<any[]>([]);

  // const addFoodBadge = (e: MouseEvent) => {
  //   setFoodBadges([...foodBadges, { x: e.screenX, y: e.screenY }]);
  // };

  return (
    <>
      <div
        id='background'
        className='bg-better-green bg-wave bg-cover w-screen h-screen overflow-hidden'
      >
        <AnimatePresence>
          {data && !started && <RecipeSummary key='summary' recipe={data} />}
          {data && started && <RecipeContainer key='container' recipe={data} />}
          {error && <RecipeError key='error' />}
          {(isLoading || isUninitialized) && <RecipeLoading key='loading' />}
          <SettingsMenu />
        </AnimatePresence>

        <Toaster position='bottom-right' />
        {/* {foodBadges.map((b, i) => (
          <div key={i} style={{ top: b.y, left: b.x }} className='absolute'>
            <Image
              alt='Bouncing fruit'
              src='/ingredients/chili-pepper.svg'
              width='70'
              height='70'
            />
          </div>
        ))} */}
      </div>
    </>
  );
}

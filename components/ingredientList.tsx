import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Ingredient } from '../models/ingredient';
import { Instruction } from '../models/instruction';
import { Recipe } from '../models/recipe';
import { RootState } from '../store/store';
import BorderBox from './borderBox';
import IngredientRow from './ingredientRow';
import RecipeMeta from './recipeMeta';

export default function IngredientList(props: { ingredients: Ingredient[] }) {
  const { instructionsCompleted } = useSelector(
    (state: RootState) => state.progress
  );

  const [ingredientsUsed, setIngredientsUsed] = useState<string[]>([]);

  return (
    <BorderBox className='md:ml-4 overflow-y-auto overscroll-y-auto scrollbar-hide'>
      {/* <RecipeMeta {...props} /> */}
      <div className='divide-y-2 divide-green-600 divide-dashed'>
        {props.ingredients.map((ing, i) => (
          <motion.div
            className={'hidden md:block py-2'}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 * i }}
            key={ing.id + i}
          >
            <IngredientRow
              ingredient={ing}
              isUsed={ingredientsUsed.includes(ing.id)}
            />
          </motion.div>
        ))}
      </div>
    </BorderBox>
  );
}

function getUsed(instructions: Instruction[], completed: string[]) {
  const instructionsCompleted = instructions.filter((inst) =>
    completed.includes(inst.id)
  );
  return instructionsCompleted.reduce(
    (acc: string[], curr) => acc.concat(curr.ingredients),
    []
  );
}

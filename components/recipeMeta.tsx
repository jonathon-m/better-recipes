import { Recipe } from '../models/recipe';
import { Activity, Clock, Users } from 'react-feather';

export default function RecipeMeta(props: { recipe: Recipe }) {
  return (
    <div className='py-4 grid grid-cols-3 grid-rows-1 place-items-center text-gray-500'>
      <p>
        <Users className='inline-block pr-1' />
        {props.recipe.servings} serves
      </p>
      <p>
        <Activity className='inline-block pr-1' />
        {props.recipe.instructions.length} steps
      </p>
      <p>
        <Clock className='inline-block pr-1' />
        {props.recipe.time.total}
      </p>
    </div>
  );
}

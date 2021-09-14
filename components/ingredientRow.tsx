import { Ingredient } from '../models/ingredient';

export default function IngredientRow(props: {
  ingredient: Ingredient | undefined;
  isUsed?: boolean;
}) {
  function getStyle(): string {
    if (props.isUsed) {
      return 'font-light line-through';
    } else {
      return 'font-light';
    }
  }

  return (
    <>
      {props.ingredient && (
        <p className={getStyle()}>{props.ingredient.text}</p>
      )}
    </>
  );
}

import { Ingredient } from "../models/ingredient"

export default function IngredientRow(props: { ingredient: Ingredient, isCurrent: boolean, isUsed: boolean} ) {

    function getStyle(): string {
      if (props.isCurrent) {
        return 'font-extrabold text-lg '
      } else if (props.isUsed) {
        return 'font-light line-through'
      } else {
        return 'font-light'
      }
    }

    return <p className={getStyle()}>
      {
          props.ingredient.text
      }
    </p>
  
  }
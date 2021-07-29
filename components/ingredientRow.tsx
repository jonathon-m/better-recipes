import { Ingredient } from "../models/ingredient"

export default function IngredientRow(props: { ingredient: Ingredient} ) {

    return <p>
      {
          props.ingredient.text
      }
    </p>
  
  }
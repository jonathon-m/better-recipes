import { useState } from "react"
import { Ingredient } from "../models/ingredient"

export default function IngredientCrossable(props: { ingredient: Ingredient} ) {

    const [strike, setStrike] = useState(false)

    const toggleStrike = () => {
      setStrike(!strike)
    }

    return <p className='m-2 cursor-pointer' onClick={toggleStrike} style={{textDecoration: strike ? 'line-through' : ''}}>
      {
          props.ingredient.text
      }
    </p>
  
  }
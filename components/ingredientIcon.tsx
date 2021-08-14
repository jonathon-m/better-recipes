import { useEffect, useState } from "react"
import { Ingredient } from "../models/ingredient"
import { icons } from "../utils/recipeIcons"


export default function IngredientIcon(props: { ingredient: Ingredient | undefined } ) {

    const [icon, setIcon] = useState<string | undefined>()
    const [name, setName] = useState<string | undefined>()

    useEffect(() => {
        if (props.ingredient) {
            for (let label of props.ingredient.labels) {
                let name = label.toLowerCase()
                if (name && icons.includes(name)) {
                    setIcon(`/ingredients/${name}.svg`)
                    setName(name)
                    break;
                }
            }
        }
    }, [props.ingredient])

    return <>
    { icon &&
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
        width="70" 
        height="70"
        alt={name}
        src={icon}/>
    }
    </>
  
  }
import { useGetRecipeByUrlQuery } from "../../middleware/recipeAPI"
import { useRouter } from 'next/router'
import { skipToken } from "@reduxjs/toolkit/dist/query/react"
import StepCard from "../../components/stepCard"
import IngredientList from "../../components/ingredientList"
import RecipeSummary from "../../components/recipeSummary"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store/store"
import React, { useState } from "react"
import { AnimatePresence } from "framer-motion"


export default function RecipePage() {
  
  const router = useRouter()
  const { recipeUrl } = router.query

  const { data, error, isLoading, isUninitialized } = useGetRecipeByUrlQuery(recipeUrl ? encodeURIComponent(recipeUrl as string) : skipToken)

  const started = useSelector((state: RootState) => state.progress.started)

  const [allIngredientsReady, setAllIngredientsReady] = useState(false)

  return <div className="bg-carrot-pattern bg-16 w-screen h-screen grid place-items-center">
    <AnimatePresence>
      { data && !started && <RecipeSummary key="summary" recipe={data}></RecipeSummary> }
      { data && started && !allIngredientsReady && <IngredientList ingredients={data.ingredients}></IngredientList> }
      { data && started && allIngredientsReady && 
        <div>
          {data.steps.map((step, key) => <StepCard key={key} step={step}></StepCard>)}
        </div>
      }
      {error && <div>error</div>}
      {isLoading && <div>loading</div>}
      {isUninitialized && <div>Waiting</div>}
    </AnimatePresence>
  </div>


}


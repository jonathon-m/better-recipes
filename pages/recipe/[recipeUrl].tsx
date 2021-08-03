import { useGetRecipeByUrlQuery } from "../../middleware/recipeAPI"
import { useRouter } from 'next/router'
import { skipToken } from "@reduxjs/toolkit/dist/query/react"

import RecipeSummary from "../../components/recipeSummary"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { AnimatePresence } from "framer-motion"
import RecipeContainer from "../../components/recipeContainer"
import RecipeLoading from "../../components/recipeLoading"
import RecipeError from "../../components/recipeError"


export default function RecipePage() {
  
  const router = useRouter()
  const { recipeUrl } = router.query

  const { data, error, isLoading, isUninitialized } = useGetRecipeByUrlQuery(recipeUrl ? encodeURIComponent(recipeUrl as string) : skipToken)

  const started = useSelector((state: RootState) => state.progress.started)

  return <div className="bg-carrot-pattern bg-16 w-screen h-screen md:p-10 overflow-hidden">
    <AnimatePresence>
      { data && !started && <RecipeSummary key="summary" recipe={data}/> }
      { data && started &&<RecipeContainer key="container" recipe={data}/> }
      { error && <RecipeError key="error"/>}
      { (isLoading || isUninitialized) && <RecipeLoading key="loading"/> }
    </AnimatePresence>
  </div>


}


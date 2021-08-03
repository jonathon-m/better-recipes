import { AnimateSharedLayout } from "framer-motion";
import React from "react";
import { useSelector } from "react-redux";
import { Recipe } from "../models/recipe";
import { RootState } from "../store/store";
import Header from "./header";
import IngredientList from "./ingredientList";
import RecipeProgress from "./recipeProgress";
import StepContainer from "./stepContainer";

export default function RecipeContainer(props: { recipe: Recipe }) {
  const started = useSelector((state: RootState) => state.progress.started);
  const stepIndex = useSelector((state: RootState) => state.progress.stepIndex);

  return (
    <AnimateSharedLayout type="crossfade">
      <div className="w-full h-full grid grid-cols-6 grid-rows-6 gap-y-4 p-2 md:grid-rows-6 md:gap-10">
        <div className="col-span-6 mb-12 order-first md:col-span-2 md:mt-6 lg:mt-8">
          <Header />
        </div>

        <div className="row-start-5 row-span-1 col-span-6 order-2 h-32 md:row-start-2 md:order-1 md:col-span-2 md:row-span-4">
          <IngredientList ingredients={props.recipe.ingredients} step={props.recipe.steps[stepIndex]} />
        </div>
        <div className="-mt-12 row-start-2 row-span-3 col-span-6 order-1 md:mt-0 md:row-start-0 md:order-2 md:col-span-4 md:row-span-5">
          {props.recipe.steps.map(
            (step) =>
              stepIndex === step.index && (
                <StepContainer key={step.index} step={step} />
              )
          )}
        </div>

        <div className="row-start-6 row-span-1 order-3 col-span-6 row-span-1">
          <RecipeProgress recipe={props.recipe} />
        </div>
      </div>
    </AnimateSharedLayout>
  );
}

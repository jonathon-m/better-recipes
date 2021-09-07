import { ParserConfidence } from '../models/parserConfidence';
import { Recipe } from '../models/recipe';
import { RecipeData } from '../models/recipeData';

export function compare(source: RecipeData, result: Recipe): ParserConfidence {
  const sourceInstructionsLength = source.instructions.join('').length;
  const resultInstructionsLength = result.instructions
    .map((i) => i.text)
    .join('').length;

  const percentCapturedInstructions =
    resultInstructionsLength / sourceInstructionsLength;

  const resultIngredients = result.ingredients
    .filter((i) => i.usedIn.length > 0)
    .map((i) => i.text);
  const sourceIngredientsCount = source.ingredients.length;
  const resultIngredientsCount = resultIngredients.length;
  const percentCapturedIngredients =
    resultIngredientsCount / sourceIngredientsCount;

  let unusedIngredients = new Set(source.ingredients);
  for (let ing of resultIngredients) {
    unusedIngredients.delete(ing);
  }

  return {
    percentCapturedInstructions,
    percentCapturedIngredients,
    unusedIngredients: Array.from(unusedIngredients),
  };
}

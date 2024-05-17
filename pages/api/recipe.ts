import type { NextApiRequest, NextApiResponse } from 'next';
import { APIError } from '../../models/errors';
import { Recipe } from '../../models/recipe';
import { RecipeData } from '../../models/recipeData';
import { parseIngredients } from '../../utils/recipeCompletion';
const recipeScraper = require('recipe-scraper');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecipeData | APIError>
) {
  const { url } = req.query;
  console.log(url);
  if (!url) {
    return res
      .status(400)
      .json({ reason: 'Must include recipe source url as query parameter' });
  }
  getRecipe(url as string)
    .then((data: RecipeData) => {
      return res.status(200).json(data);
    })
    .catch((error: Error) => {
      console.log(error)
      if (error.message === 'No recipe found on page') {
        return res.status(400).json({ reason: 'No recipe found' });
      } else if (error.message === 'Failed to parse domain') {
        return res.status(400).json({ reason: 'Invalid source URL' });
      } else {
        return res.status(500).json({ reason: 'Unknown Error' });
      }
    });
}

async function getRecipe(url: string) {
  // https://www.bbcgoodfood.com/recipes/bucatini-with-mushrooms-sausage'
  const recipeData: RecipeData = await recipeScraper(url);
  console.log(recipeData)
  return recipeData
}

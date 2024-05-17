import type { NextApiRequest, NextApiResponse } from 'next';
import { APIError } from '../../models/errors';
import { Recipe } from '../../models/recipe';
import { RecipeData } from '../../models/recipeData';
import { compare } from '../../utils/confidence';
import { RecipeParser } from '../../utils/recipeParser';
const recipeScraper = require('recipe-scraper');

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Recipe | APIError>
) {
  const { url } = req.query;
  console.log(url);
  if (!url)
    return res
      .status(400)
      .json({ reason: 'Must include recipe source url as query parameter' });
  getRecipe(url as string)
    .then((data: RecipeData) => {
      let recipe = new RecipeParser(data).export();
      console.log(compare(data, recipe));
      res.status(200).json(recipe);
    })
    .catch((error: Error) => {
      if (error.message === 'Failed to parse domain') {
        res.status(400).json({ reason: 'Invalid source URL' });
      } else {
        res.status(500).json({ reason: 'Unknown Error' });
      }
    });
}

async function getRecipe(url: string) {
  //return recipeScraper('https://www.allrecipes.com/recipe/158968/spinach-and-feta-turkey-burgers/');
  //'https://www.allrecipes.com/recipe/264739/lemon-garlic-chicken-kebabs/'
  return recipeScraper(url);
}

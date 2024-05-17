import type { NextApiRequest, NextApiResponse } from 'next';
import { APIError } from '../../models/errors';
import { parseIngredients } from '../../utils/recipeCompletion';
const { v4: uuidv4 } = require('uuid');


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | APIError>
) {
  const { ingredients } = req.body
  const ingredientsResponse = await parseIngredients(`- ${ingredients.join('\n- ')}`)
  const rawMessage = ingredientsResponse.message?.content

  if (!rawMessage) {
    res.status(400).json({ reason: 'No response from OpenAI' });
    return;
  }
  const parsedIngredients = JSON.parse(rawMessage)
  console.log(parsedIngredients)
  const ingredientsWithId = parsedIngredients.map((i: any) => ({
    id: uuidv4(), ...i }))

  res.status(200).json({ingredients: ingredientsWithId});
}
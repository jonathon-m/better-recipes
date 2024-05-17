import type { NextApiRequest, NextApiResponse } from 'next';
import { APIError } from '../../models/errors';
import { Recipe } from '../../models/recipe';
import { parseInstructions } from '../../utils/recipeCompletion';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any | APIError>
) {
  const { instructions } = req.body
  const instructionsResponse = await parseInstructions(instructions)
  const rawMessage = instructionsResponse.message?.content
  if (!rawMessage) {
    res.status(400).json({ reason: 'No response from OpenAI' });
    return;
  }
  const ingredients = JSON.parse(rawMessage.replaceAll('\n', ''))
  console.log(ingredients)

  res.status(200).json({data: ingredients});
}
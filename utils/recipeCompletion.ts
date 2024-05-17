import { ChatCompletionRequestMessage } from "openai"
import { completion } from "./openai"

const instructionsPrompt =  `Break these instructions into individual actions.` +
                            `Format them as a JSON array, where each element includes` +
                            `the keys "title", "method", "ingredients" and optionally "time".` +
                            `"ingredients" is an array where each element is an` +
                            `ingredient used in that action. "title" is at most 3` +
                            `words describing the action. "time" is an object with` +
                            `"max" and "min" in seconds. "method is the full text of the action.` +
                            `Respond only with JSON.`


const ingredientsPrompt =   `Convert these ingredients into JSON. Include the name, amount, units and base ingredient.` +
                            `Do not include preparation, units should be converted to metric. A base ` +
                            `ingredient is usually the noun in the text e.g. "chicken" for "chicken breast" or "pasta" for "spaghetti". Only specify a base ingredient for non-base ingredients.` +
                            `Round millilitres and grams to the nearest 5. Use weight units for non-liquids.` +
                            // `Include a second top level key "preparation" that lists actions that should ` +
                            // `be applied to ingredients to prepare them. E.g. "Juice and zest the lemon".` +
                            `Respond only with JSON.`

export async function parseInstructions(instructions: string) {
    const messages: ChatCompletionRequestMessage[] = [
        {
            role: "system", "content": "You are a helpful assistant."
        },
        {
            role: "user",
            content: instructionsPrompt,
        },
        {
            role: "user",
            content: instructions,
        }
    ]
    return completion(messages)
}

export async function parseIngredients(ingredients: string) {
    const messages: ChatCompletionRequestMessage[] = [
        {
            role: "system",
            content: ingredientsPrompt,
        },
        {
            role: "user",
            content: ingredients,
        }
    ]
    return completion(messages)
}